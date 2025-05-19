from flask import Blueprint, jsonify # type: ignore
#from ML.models import temperature_linearRegression

temperature_predictions_bp = Blueprint("temperature_predictions", __name__)

@temperature_predictions_bp.route("/predictions/temperatures", methods=["GET"])
def get_temperature_route():
    try:
       # data = temperature_linearRegression.get_temperature_predictions_json()
       # return jsonify(data), 200
        return "implement temperature model", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    