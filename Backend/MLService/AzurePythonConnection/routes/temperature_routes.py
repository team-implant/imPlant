from flask import Blueprint, jsonify # type: ignore
from AzurePythonConnection.services.temperature_service import get_temperature, get_temperature_by_id


temperature_bp = Blueprint("temperature", __name__)

@temperature_bp.route("/temperature", methods=["GET"])
def temperature():
    try:
        data = get_temperature()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@temperature_bp.route("/temperature/<int:temperature_id>", methods=["GET"])
def temperature_id(temperature_id):
    try:
        data = get_temperature_by_id(temperature_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "WaterPump not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500