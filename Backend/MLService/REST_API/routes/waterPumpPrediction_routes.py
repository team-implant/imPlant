from flask import Blueprint, jsonify # type: ignore
#from ML.models import waterPump_linearRegression

water_pump_predictions_bp = Blueprint("water_pump_predictions", __name__)

@water_pump_predictions_bp.route("/predictions/waterPump", methods=["GET"])
def get_water_pump_route():
    try:
       # data = waterPump_linearRegression.get_water_pump_predictions_json()
       # return jsonify(data), 200
        return "implement water pump level model", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    