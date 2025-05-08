from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/mlprediction', methods=['GET'])
def get_prediction():
    # Dummy data - you can replace this with any data you want
    dummy_data = {
        "prediction": "healthy",
        "confidence": 0.95,
        "plantId": 1,
        "timestamp": "2025-05-08T12:00:00"
    }
    return jsonify(dummy_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)