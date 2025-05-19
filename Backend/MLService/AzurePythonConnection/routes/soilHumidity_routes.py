from flask import Blueprint, jsonify # type: ignore
from AzurePythonConnection.services.soilHumidity_service import get_soil_humidity, get_soil_humidity_by_id

soil_humidity_bp = Blueprint("soil_humidity", __name__)

@soil_humidity_bp.route("/soilhumidity", methods=["GET"])
def soil_humidity():
    try:
        data = get_soil_humidity()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@soil_humidity_bp.route("/soilhumidity/<int:soil_humidity_id>", methods=["GET"])
def soil_humidity_by_id(soil_humidity_id):
    try:
        data = get_soil_humidity_by_id(soil_humidity_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "SoilHumidity not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500