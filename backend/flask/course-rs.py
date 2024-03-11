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

# Function to fetch courses data from the database
def fetch_courses_data(conn):
    try:
        course_query = text("""SELECT * FROM public."Courses";""")
        course_data = pd.read_sql(course_query, conn)
        print("Fetched courses data successfully")
        return course_data
    except Exception as e:
        print("Error fetching courses data:", e)
        return None

# Function to read data from database
def read_data_from_database():
    conn = connect_to_database()
    if conn:
        candidates_data = fetch_candidates_data(conn)
        courses_data = fetch_courses_data(conn)
        conn.close()  # Close the database connection
        return candidates_data, courses_data
    else:
        return None, None

# Load datasets using database queries
candidates_data, courses_data = read_data_from_database()

# Ensure data is loaded successfully
if candidates_data is None or courses_data is None:
    print("Error loading data from the database. Exiting...")
    exit()

# Combine text data for CountVectorizer
candidate_texts = candidates_data['skills'] + " " + candidates_data['preferredJobTitle'] + " " + candidates_data['location']+ " " + candidates_data['education_level']+ " " + candidates_data['experience'].astype(str)+ " " + candidates_data['preferredJobType']+ " " + candidates_data['work_preference']+ " " + candidates_data['softSkills']
courses_texts = courses_data['course_title'] + " " + courses_data['short_intro'] + " " +courses_data['category']+ " " +courses_data['sub_category']

# Replace NaN values with empty strings in candidate and job texts
candidate_texts.fillna('', inplace=True)
courses_texts.fillna('', inplace=True)

# CountVectorizer without max_features parameter
count_vectorizer = CountVectorizer(stop_words='english')
candidate_vectors = count_vectorizer.fit_transform(candidate_texts)
course_vectors = count_vectorizer.transform(courses_texts)

# Ensure that both candidate and job vectors have the same number of features
assert candidate_vectors.shape[1] == course_vectors.shape[1], "Number of features must match"

# Define the deep learning model architecture for candidate-course recommendation
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
    Dense(len(courses_data), activation='softmax')  # Output layer with softmax activation for multi-class classification
])

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.001), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model for candidate-course recommendation with EarlyStopping
history = model.fit(x=candidate_vectors.toarray(), y=candidates_data.index, epochs=10, batch_size=128)

# Calculate cosine similarity between candidates and courses
cosine_sim_matrix = cosine_similarity(candidate_vectors, course_vectors)

# Function to recommend courses for a candidate using cosine similarity
def recommend_courses(candidate_id, top_n=7):
    candidate_index = candidate_id - 1  # Adjust index to match zero-based indexing
    if candidate_index < 0 or candidate_index >= len(candidates_data):
        return []
    candidate_cosine_sim = cosine_sim_matrix[candidate_index]
    top_indices = np.argsort(candidate_cosine_sim)[-top_n:]
    return top_indices

# Function to recommend courses for a given candidate ID via API
@app.route('/recommend/<int:candidate_id>', methods=['GET'])
def recommend_course_api(candidate_id):
    recommended_indices = recommend_courses(candidate_id)
    recommended_courses = []
    for course_id in recommended_indices:
        course_info = courses_data.iloc[course_id]
        recommended_course = {
            'course_title': str(course_info['course_title']),
            'short_intro': str(course_info['short_intro']),
            'category': str(course_info['category']),
            'sub_category': str(course_info['sub_category']),
            'course_url': str(course_info['URL'])  # Include course URL in the response
        }
        recommended_courses.append(recommended_course)
    response = jsonify({'recommended_courses': recommended_courses})
    response.status_code = 200
    return response

if __name__ == '__main__':
    app.run(debug=True)
