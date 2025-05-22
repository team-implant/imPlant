from flask import Blueprint, jsonify # type: ignore
from ML.models.Temperature_models import temperature_linearRegression
from REST_API.services.general_prediction_service import get_predictions

temperature_predictions_bp = Blueprint("temperature_predictions", __name__)

@temperature_predictions_bp.route("/predictions/temperatures", methods=["GET"])
def get_temperature_route():
    try:
        data = temperature_linearRegression.get_temperature_predictions_json()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@temperature_predictions_bp.route("/predictions/temperatures/forecast", methods=["GET"])
def forecast_multi_temperature():
    try:
        forecast = get_predictions("Temperature")
        return jsonify(forecast), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500