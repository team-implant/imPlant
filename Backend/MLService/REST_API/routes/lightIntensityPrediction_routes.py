from flask import Blueprint, jsonify # type: ignore
from ML.models.LightIntensity_models import lightIntensity_linearRegression

light_intensity_predictions_bp = Blueprint("light_intensity_predictions", __name__)

@light_intensity_predictions_bp.route("/predictions/lightintensity", methods=["GET"])
def get_light_intensity_route():
    try:
        data = lightIntensity_linearRegression.get_light_intensity_predictions_json()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    