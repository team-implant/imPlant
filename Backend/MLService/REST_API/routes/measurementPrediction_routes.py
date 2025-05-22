from flask import Blueprint, jsonify # type: ignore
from ML.models.Measurement_models import measurement_randomForest
from REST_API.services.general_prediction_service import get_predictions

measurement_predictions_bp = Blueprint("measurement_predictions", __name__)

@measurement_predictions_bp.route("/predictions/measurements", methods=["GET"])
def get_measurements_route():
    try:
        data = measurement_randomForest.get_measurement_predictions_json()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@measurement_predictions_bp.route("/predictions/measurements/forecast", methods=["GET"])
def forecast_multi_measurements():
    try:
        forecast = get_predictions("Measurement")
        return jsonify(forecast), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500