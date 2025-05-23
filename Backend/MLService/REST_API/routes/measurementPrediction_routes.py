from flask import Blueprint, jsonify # type: ignore
from ML.models.Measurement_models import measurement_randomForest
from REST_API.services.general_prediction_service import get_predictions
from ML.models.Measurement_models import measurement_randomForest, measurement_gradientBoosting

measurement_predictions_bp = Blueprint("measurement_predictions", __name__)

"""@measurement_predictions_bp.route("/predictions/measurements", methods=["GET"])
def get_measurements_route():
    try:
        data = measurement_randomForest.get_measurement_predictions_json()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
"""    
# it uses all measurment values to make predictions, but may make more sense to put it with soil humidity 
@measurement_predictions_bp.route("/predictions/measurements/gradient_boosting", methods=["GET"]) 
def get_measurements_gradient_boosting_route():
    try:
        data = measurement_gradientBoosting.get_soil_humidity_predictions_json()
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