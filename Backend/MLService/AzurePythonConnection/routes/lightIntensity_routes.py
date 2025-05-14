from flask import Blueprint, jsonify # type: ignore
from AzurePythonConnection.services.lightIntensity_service import get_light_Intensity, get_light_intensity_by_id

light_intensity_bp = Blueprint("light_intensity", __name__)

@light_intensity_bp.route("/lightintensity", methods=["GET"])
def get_light_intensity_route():
    try:
        data = get_light_Intensity()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@light_intensity_bp.route("/lightintensity/<int:lightIntesity_id>", methods=["GET"])
def get_light_intensity_by_id(lightintensity_id):
    try:
        data = get_light_intensity_by_id(lightintensity_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "Measurement not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500