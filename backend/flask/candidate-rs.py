import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
import sys
from sqlalchemy import text

# Set console encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

# Function to connect to the database using SQLAlchemy
def connect_to_database():
    try:
        engine = create_engine("postgresql://postgres:arham123@127.0.0.1:5432/skillsmatch")
        conn = engine.connect()
        print("Connected to database successfully")
        return conn
    except Exception as e:
        print("Unable to connect to the database:", e)
        return None

# Function to fetch candidates data from the database
def fetch_candidates_data(conn):
    try:
        candidates_query = text("""SELECT * FROM public."Candidates" ORDER BY candidate_id;""")
        candidates_data = pd.read_sql(candidates_query, conn)
        print("Fetched candidates data successfully")
        return candidates_data
    except Exception as e:
        print("Error fetching candidates data:", e)
        return None

# Function to fetch jobs data from the database
def fetch_jobs_data(conn):
    try:
        job_query = text("""SELECT * FROM public."Jobs";""")
        job_data = pd.read_sql(job_query, conn)
        print("Fetched jobs data successfully")
        return job_data
    except Exception as e:
        print("Error fetching jobs data:", e)
        return None

# Function to read data from database
def read_data_from_database():
    conn = connect_to_database()
    if conn:
        candidates_data = fetch_candidates_data(conn)
        jobs_data = fetch_jobs_data(conn)
        conn.close()  # Close the database connection
        return candidates_data, jobs_data
    else:
        return None, None

# Load datasets using database queries
candidates_data, jobs_data = read_data_from_database()

# Ensure data is loaded successfully
if candidates_data is None or jobs_data is None:
    print("Error loading data from the database. Exiting...")
    exit()

# Combine text data for CountVectorizer
candidate_texts = candidates_data['skills'] + " " + candidates_data['preferredJobTitle'] + " " + candidates_data['location']+ " " + candidates_data['education_level']+ " " + candidates_data['experience'].astype(str)+ " " + candidates_data['preferredJobType']+ " " + candidates_data['work_preference']+ " " + candidates_data['softSkills']
job_texts = jobs_data['job_title'] + " " + jobs_data['job_location'] + " " + jobs_data['education_required'] + " " + jobs_data['skills_required'] + " " + jobs_data['soft_skills_required'] + " " + jobs_data['work_experience_required'].astype(str) + " " + jobs_data['work_type']

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

# Train the model for candidate-job recommendation with EarlyStopping
history = model.fit(x=candidate_vectors.toarray(), y=candidates_data.index, epochs=10, batch_size=128)

# Calculate cosine similarity between candidates and jobs
cosine_sim_matrix = cosine_similarity(candidate_vectors, job_vectors)

# Function to recommend candidates for a job using cosine similarity
def recommend_candidates(job_id, top_n=10):
    job_index = job_id - 1  # Adjust index to match zero-based indexing
    if job_index < 0 or job_index >= len(jobs_data):
        return []
    job_cosine_sim = cosine_sim_matrix[:, job_index]
    top_indices = np.argsort(job_cosine_sim)[-top_n:]
    return top_indices

# Function to recommend candidates for a given job ID via API
# Function to recommend candidates for a given job ID via API
@app.route('/recommend_candidates/<int:job_id>', methods=['GET'])
def recommend_candidates_api(job_id):
    recommended_indices = recommend_candidates(job_id)
    recommended_candidates = []
    for candidate_id in recommended_indices:
        candidate_info = candidates_data.iloc[candidate_id]
        # Check if the 'name' column exists in the DataFrame
        if 'name' in candidate_info:
            name = str(candidate_info['firstname'])+" "+str(candidate_info['lastname'])
        else:
            name = "Name Not Available"
        recommended_candidate = {
            'candidate_id': str(candidate_info['candidate_id']),
            'name': str(candidate_info['firstname'])+" "+str(candidate_info['lastname']),
            'email': str(candidate_info['email']),
            'skills': str(candidate_info['skills']),
            'experience': int(candidate_info['experience']),
            'education_level': str(candidate_info['education_level'])
        }
        recommended_candidates.append(recommended_candidate)
    response = jsonify({'recommended_candidates': recommended_candidates})
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True, port=2004, host='0.0.0.0')
    
