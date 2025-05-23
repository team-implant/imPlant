from flask import Blueprint, jsonify # type: ignore
from ML.models.WaterPump_models import waterPump_linearRegresion
from REST_API.services.general_prediction_service import get_predictions

water_pump_predictions_bp = Blueprint("water_pump_predictions", __name__)

"""@water_pump_predictions_bp.route("/predictions/waterPump", methods=["GET"])
def get_water_pump_route():
    try:
       data = waterPump_linearRegresion.get_water_pump_predictions_json()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
"""
@water_pump_predictions_bp.route("/predictions/waterPump/forecast", methods=["GET"])
def forecast_multi_water_pump():
    try:
        forecast = get_predictions("WaterPump")
        return jsonify(forecast), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    