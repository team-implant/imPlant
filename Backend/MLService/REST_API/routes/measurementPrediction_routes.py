from flask import Blueprint, jsonify # type: ignore
#from ML.models import measurement_linearRegression

measurement_predictions_bp = Blueprint("measurement_predictions", __name__)

@measurement_predictions_bp.route("/predictions/measurements", methods=["GET"])
def get_measurements_route():
    try:
       # data = measurement_linearRegression.get_measurement_predictions_json()
       # return jsonify(data), 200
        return "implement measurement model", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    