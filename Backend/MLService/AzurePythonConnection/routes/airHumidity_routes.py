from flask import Blueprint, jsonify # type: ignore
from AzurePythonConnection.services.airHumidity_service import get_air_humidity, get_air_humidity_by_id

air_humidity_bp = Blueprint("air_humidity", __name__)

@air_humidity_bp.route("/airhumidity", methods=["GET"])
def  air_humidity():
    try:
        data = get_air_humidity()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@air_humidity_bp.route("/airhumidity/<int:air_humidity_id>", methods=["GET"])
def get_air_humidity_by_id_route(air_humidity_id):
    try:
        data = get_air_humidity_by_id(air_humidity_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "Air humidity not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500    