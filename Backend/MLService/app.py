import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from AzurePythonConnection.services.measurement_service import get_measurements
from AzurePythonConnection.model.measurement_model import Measurement  

app = Flask(__name__)
CORS(app)

@app.route("/measurements", methods=["GET"])
def measurements():
    try:
        data = get_measurements()
        measurements = [Measurement(**item).dict() for item in data]
        return jsonify(measurements), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)