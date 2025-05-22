from flask import Blueprint, jsonify # type: ignore
from ML.models.AirHumidity_models.future_airHumidity_prediction import forecast_air_humidity_multi_step
from ML.models.SoilHumidities_models.future_soilHumidity_prediction import forecast_soil_humidity_multi_step
from ML.models.LightIntensity_models.future_lightIntensity_prediction import forecast_light_intensity_multi_step
from ML.models.Temperature_models.future_temperature_prediction import forecast_temperature_step
from ML.models.WaterPump_models.future_waterPump_prediction import forecast_water_pump_multi_step
model_activation_bp = Blueprint("model_activation", __name__)

@model_activation_bp.route("/models/", methods=["GET"])
def get_all_route():
    try:
       forecast_air_humidity_multi_step()
       forecast_soil_humidity_multi_step()
       #forecast_water_pump_multi_step()
       forecast_temperature_step()
       forecast_light_intensity_multi_step()
       return "Models finished running, refresh the site", 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@model_activation_bp.route("/models/airhumidity", methods=["GET"])
def get_air_humidity_route():
    try:
       data = forecast_air_humidity_multi_step()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@model_activation_bp.route("/models/soilhumidity", methods=["GET"])
def get_soil_humidity_route():
    try:
       data = forecast_soil_humidity_multi_step()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@model_activation_bp.route("/models/temperature", methods=["GET"])
def get_temperature_route():
    try:
       data = forecast_temperature_step()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@model_activation_bp.route("/models/lightIntensity", methods=["GET"])
def get_light_intensity_route():
    try:
       data = forecast_light_intensity_multi_step()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@model_activation_bp.route("/models/waterPump", methods=["GET"])
def get_water_pump_route():
    try:
       data = forecast_water_pump_multi_step()
       return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500