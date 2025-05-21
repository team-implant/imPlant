from Backend.MLService.ML.models.SoilHumidities_models.future_soilHumidity_prediction import forecast_soil_humidity
from flask import Blueprint, jsonify # type: ignore
from ML.models.SoilHumidities_models import soilHumidity_linearRegression

soil_humidity_predictions_bp = Blueprint("soil_humidity_predictions", __name__)

@soil_humidity_predictions_bp.route("/predictions/soilhumidity", methods=["GET"])
def get_soil_humidity_route():
    try:
       data = soilHumidity_linearRegression.get_soil_humidity_predictions_json()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@soil_humidity_predictions_bp.route("/forecast/soilhumidity/next", methods=["GET"])
def forecast_next_soil_humidity():
    try:
        prediction = forecast_soil_humidity()
        return jsonify(prediction), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500