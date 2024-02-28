from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS from flask_cors module
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
import sys
import psycopg2

# Set console encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

# Initialize connection to PostgreSQL database
conn = psycopg2.connect(
    dbname="skillsmatch",
    user="postgres",
    password="1234",
    host="127.0.0.1",
    port="5432"
)

# Read Candidates and Courses data from the database
candidates_query = """SELECT * FROM public."Candidates";"""
courses_query = """SELECT * FROM public."Courses";"""

candidates_data = pd.read_sql(candidates_query, con=conn)
courses_data = pd.read_sql(courses_query, con=conn)

# Combine text data for CountVectorizer
candidate_texts = candidates_data['skills'] + " " + candidates_data['preferredJobTitle'] + " " + candidates_data['softSkills']
course_texts = courses_data['course_title'] + courses_data['short_intro'] + " " + courses_data['category'] + " " + courses_data['sub_category']

# Replace NaN values with empty strings in candidate and course texts
candidate_texts.fillna('', inplace=True)
course_texts.fillna('', inplace=True)

# CountVectorizer
count_vectorizer = CountVectorizer(stop_words='english', max_features=5000)
candidate_vectors = count_vectorizer.fit_transform(candidate_texts)
course_vectors = count_vectorizer.transform(course_texts)

# Calculate cosine similarity between candidates and courses
cosine_sim_matrix = cosine_similarity(candidate_vectors, course_vectors)

# Function to recommend courses for a candidate using cosine similarity
def recommend_courses(candidate_id, top_n=7):
    candidate_cosine_sim = cosine_sim_matrix[candidate_id]
    top_indices = np.argsort(candidate_cosine_sim)[-top_n:]
    return top_indices

# Generate mapping between candidate indices and course indices based on cosine similarity
candidate_course_mapping = {candidate_id: recommend_courses(candidate_id) for candidate_id in range(len(candidates_data))}

# Convert mapping to X and y for train-test split
X_train_indices = np.array(list(candidate_course_mapping.keys()))
y_train_indices = np.array([course_indices[0] for course_indices in candidate_course_mapping.values()])  # Take the first recommended course for simplicity

# Split data into train and test sets
X_train, X_val, y_train, y_val = train_test_split(X_train_indices, y_train_indices, test_size=0.2, random_state=42)

# Generate one-hot encoded representations of the indices
num_courses = len(courses_data)
X_train_one_hot = np.zeros((len(X_train), num_courses))
X_train_one_hot[np.arange(len(X_train)), y_train] = 1

# Define the deep learning model architecture
model = Sequential([
    Dense(128, input_dim=num_courses, activation='relu'),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(num_courses, activation='softmax')  # Output layer with softmax activation for multi-class classification
])

# Compile the model
model.compile(optimizer=Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(X_train_one_hot, y_train, epochs=10, batch_size=32, validation_split=0.2)

# Function to retrieve candidate information
def get_candidate_info(candidate_id):
    candidate_info = candidates_data.iloc[candidate_id]
    return candidate_info['firstname'], candidate_info['lastname'], candidate_info['skills'], candidate_info['preferredJobTitle'], candidate_info['softSkills']

# Function to retrieve course information
def get_course_info(course_id):
    course_info = courses_data.iloc[course_id]
    return course_info['course_title'], course_info['URL'], course_info['short_intro']

# Function to recommend courses for a candidate
@app.route('/recommend/<int:candidate_id>', methods=['GET'])
def recommend_courses_api(candidate_id):
    recommended_indices = recommend_courses(candidate_id)
    recommended_courses = [get_course_info(course_id) for course_id in recommended_indices]
    response1 = jsonify({'recommended_courses': recommended_courses})
    response1.status_code = 200
    return response1

#Define a route to get candidate information
@app.route('/candidate/<int:candidate_id>', methods=['GET'])
def get_candidate_info_api(candidate_id):
    c_first_name, c_last_name, candidate_skills, preferred_job, soft_skills = get_candidate_info(candidate_id)
    candidate_info = {
        'firstname': c_first_name,
        'lastname': c_last_name,
        'skills': candidate_skills,
        'preferredJobTitle': preferred_job,
        'softSkills': soft_skills
    }
    response = jsonify(candidate_info)
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True)
