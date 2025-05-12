from flask import Flask, jsonify
from flask_cors import CORS
from flask_database_app.services.data_service import fetch_measurement_data

app = Flask(__name__)
CORS(app)  

@app.route('/api/measurements', methods=['GET'])
def get_measurements():
    data = fetch_measurement_data()
    if not data:
        return jsonify({"error": "No data found"}), 404
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
