from flask import Blueprint, jsonify # type: ignore
from ML.models.LightIntensity_models import lightIntensity_linearRegression
from REST_API.services.general_prediction_service import get_predictions

light_intensity_predictions_bp = Blueprint("light_intensity_predictions", __name__)

@light_intensity_predictions_bp.route("/predictions/lightintensity", methods=["GET"])
def get_light_intensity_route():
    try:
        data = lightIntensity_linearRegression.get_light_intensity_predictions_json()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@light_intensity_predictions_bp.route("/predictions/airhumidity/forecast", methods=["GET"])
def forecast_multi_light_intensity():
    try:
        forecast = get_predictions("AirHumidity")
        return jsonify(forecast), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    