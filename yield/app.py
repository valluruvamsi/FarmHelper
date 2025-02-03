from flask import Flask, request, render_template, jsonify
import numpy as np
import pickle
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load models
dtr = pickle.load(open('dtr.pkl', 'rb'))
preprocessor = pickle.load(open('preprocessor.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/predict", methods=['POST'])
def predict():
    try:
        # Parse JSON data from request body
        data = request.json
        Year = data.get('Year')
        average_rain_fall_mm_per_year = data.get('average_rain_fall_mm_per_year')
        pesticides_tonnes = data.get('pesticides_tonnes')
        avg_temp = data.get('avg_temp')
        Area = data.get('Area')
        Item = data.get('Item')

        # Check for missing fields
        if not all([Year, average_rain_fall_mm_per_year, pesticides_tonnes, avg_temp, Area, Item]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Prepare features and predict
        features = np.array([[Year, average_rain_fall_mm_per_year, pesticides_tonnes, avg_temp, Area, Item]], dtype=object)
        transformed_features = preprocessor.transform(features)
        prediction = dtr.predict(transformed_features).reshape(1, -1)

        return jsonify({'prediction': round(prediction[0][0], 2)})
    except Exception as e:
        return jsonify({'error': f"An error occurred: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5020)
