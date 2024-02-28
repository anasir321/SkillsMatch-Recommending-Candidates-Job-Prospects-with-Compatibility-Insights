from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from sklearn.metrics.pairwise import cosine_similarity
from tabulate import tabulate
from tensorflow.keras.callbacks import EarlyStopping
import psycopg2
import sys

# Set console encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

# Establish connection to the database
conn = psycopg2.connect(
    dbname="skillsmatch",
    user="postgres",
    password="1234",
    host="127.0.0.1",
    port="5432"
)

# Function to fetch candidates data from the database
def fetch_candidates_data():
    candidates_query = """SELECT * FROM public."Candidates";"""
    candidates_data = pd.read_sql(candidates_query, conn)
    return candidates_data

# Function to fetch jobs data from the database
def fetch_jobs_data():
    jobs_query = """SELECT j.*, c.company_name, c.company_email 
                    FROM public."Jobs" j
                    JOIN public."Companies" c ON j."companyHR_id" = c."companyHR_id";"""
    jobs_data = pd.read_sql(jobs_query, conn)
    return jobs_data

# Load datasets using database queries
candidates_data = fetch_candidates_data()
jobs_data = fetch_jobs_data()

# Combine text data for CountVectorizer
candidate_texts = candidates_data['skills'] + " " + candidates_data['preferredJobTitle'] + " " + candidates_data['location']+ " " + candidates_data['education_level']+ " " + candidates_data['experience'].astype(str)+ " " + candidates_data['preferredJobType']+ " " + candidates_data['work_preference']+ " " + candidates_data['softSkills']
job_texts = jobs_data['skills_required'] + " " + jobs_data['job_title'] + " " +jobs_data['job_location']+ " " +jobs_data['education_required']+ " " +jobs_data['work_experience_required'].astype(str)+ " " +jobs_data['job_type']+ " " +jobs_data['work_type']+ " " +jobs_data['soft_skills_required']

# Replace NaN values with empty strings in candidate and job texts
candidate_texts.fillna('', inplace=True)
job_texts.fillna('', inplace=True)

# CountVectorizer without max_features parameter
count_vectorizer = CountVectorizer(stop_words='english')
candidate_vectors = count_vectorizer.fit_transform(candidate_texts)
job_vectors = count_vectorizer.transform(job_texts)

# Ensure that both candidate and job vectors have the same number of features
assert candidate_vectors.shape[1] == job_vectors.shape[1], "Number of features must match"

# Define the deep learning model architecture for candidate-job recommendation
model = Sequential([
    Dense(512, input_shape=(candidate_vectors.shape[1],), activation='relu'),
    BatchNormalization(),
    Dropout(0.5),
    Dense(256, activation='relu'),
    BatchNormalization(),
    Dropout(0.4),
    Dense(128, activation='relu'),
    BatchNormalization(),
    Dropout(0.3),
    Dense(len(jobs_data), activation='softmax')  # Output layer with softmax activation for multi-class classification
])

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.001), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Define EarlyStopping callback
early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# Train the model for candidate-job recommendation with EarlyStopping
history = model.fit(x=candidate_vectors.toarray(), y=candidates_data.index, epochs=10, batch_size=128, callbacks=[early_stopping])

# Calculate cosine similarity between candidates and jobs
cosine_sim_matrix = cosine_similarity(candidate_vectors, job_vectors)

# Function to recommend jobs for a candidate using cosine similarity
def recommend_jobs(candidate_id, top_n=7):
    candidate_cosine_sim = cosine_sim_matrix[candidate_id]
    top_indices = np.argsort(candidate_cosine_sim)[-top_n:]
    return top_indices

# Function to recommend jobs for a given candidate ID via API
@app.route('/recommend_jobs/<int:candidate_id>', methods=['GET'])
def recommend_jobs_api(candidate_id):
    recommended_indices = recommend_jobs(candidate_id)
    recommended_jobs = []
    for job_id in recommended_indices:
        job_info = jobs_data.iloc[job_id]
        # Convert non-serializable elements to JSON serializable format
        recommended_job = {
            'job_title': str(job_info['job_title']),  # Convert to string
            'skills_required': str(job_info['skills_required']),  # Convert to string
            'job_location': str(job_info['job_location']),  # Convert to string
            'education_required': str(job_info['education_required']),  # Convert to string
            'work_experience_required': int(job_info['work_experience_required']),  # Convert to int
            'job_type': str(job_info['job_type']),  # Convert to string
            'work_type': str(job_info['work_type']),  # Convert to string
            'soft_skills_required': str(job_info['soft_skills_required']),  # Convert to string
            'company_name': str(job_info['company_name']),  # Convert to string
            'company_email': str(job_info['company_email'])  # Convert to string
        }
        recommended_jobs.append(recommended_job)
    response = jsonify({'recommended_jobs': recommended_jobs})
    response.status_code = 200
    return response

# Function to get candidate information by ID via API
@app.route('/candidate_info/<int:candidate_id>', methods=['GET'])
def candidate_info_api(candidate_id):
    candidate_info = candidates_data.iloc[candidate_id].to_dict()
    response = jsonify({'candidate_info': candidate_info})
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True, port=2003, host='0.0.0.0')
