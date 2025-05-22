from flask import Blueprint, jsonify # type: ignore
from ML.models.SoilHumidities_models import soilHumidity_linearRegression
from REST_API.services.soilHumidity_prediction_service import get_soil_humidity_predictions

soil_humidity_predictions_bp = Blueprint("soil_humidity_predictions", __name__)

@soil_humidity_predictions_bp.route("/predictions/soilhumidity", methods=["GET"])
def get_soil_humidity_route():
    try:
       data = soilHumidity_linearRegression.get_soil_humidity_predictions_json()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@soil_humidity_predictions_bp.route("/predictions/soilhumidity/forecast", methods=["GET"])
def forecast_multi_soil_humidity():
    try:
        forecast = get_soil_humidity_predictions()
        return jsonify(forecast), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500