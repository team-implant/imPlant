from flask import Blueprint, jsonify # type: ignore
from AzurePythonConnection.services.waterPumpLevel_service import get_water_pumps_level, get_water_pump_level_by_id


water_pump_bp = Blueprint("water_pump", __name__)

@water_pump_bp.route("/waterpumps", methods=["GET"])
def water_pumps():
    try:
        data = get_water_pumps_level()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@water_pump_bp.route("/waterpumps/<int:water_pump_id>", methods=["GET"])
def water_pump(water_pump_id):
    try:
        data = get_water_pump_level_by_id(water_pump_id)
        if data:
            return jsonify(data), 200
        else:
            return jsonify({"error": "WaterPump not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500