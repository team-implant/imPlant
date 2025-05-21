from flask import Blueprint, jsonify # type: ignore
from ML.models.AirHumidity_models import airHumidity_linearRegresion
from ML.models.AirHumidity_models.future_airHumidity_prediction import forecast_air_humidity_multi_step

air_humidity_predictions_bp = Blueprint("air_humidity_predictions", __name__)

@air_humidity_predictions_bp.route("/predictions/airhumidity", methods=["GET"])
def get_air_humidity_route():
    try:
       data = airHumidity_linearRegresion.get_air_humidity_predictions_json()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@air_humidity_predictions_bp.route("/predictions/airhumidity/forecast", methods=["GET"])
def forecast_multi_air_humidity():
    try:
        forecast = forecast_air_humidity_multi_step()
        return jsonify(forecast), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    