from flask import Blueprint, jsonify # type: ignore
from AzurePythonConnection.services.measurement_service import get_measurements, get_measurement_by_id

measurement_bp = Blueprint("measurement", __name__)

@measurement_bp.route("/measurements", methods=["GET"])
def get_measurements_route():
    try:
        data = get_measurements()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@measurement_bp.route("/measurements/<int:measurement_id>", methods=["GET"])
def get_measurement_by_id_route(measurement_id):
    try:
        data = get_measurement_by_id(measurement_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "Measurement not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500