import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from AzurePythonConnection.routes.measurement_routes import measurement_bp
from AzurePythonConnection.routes.waterPump_routes import water_pump_bp
from AzurePythonConnection.routes.temperature_routes import temperature_bp
from AzurePythonConnection.routes.soilHumidity_routes import soil_humidity_bp
from AzurePythonConnection.routes.airHumidity_routes import air_humidity_bp
from AzurePythonConnection.routes.lightIntensity_routes import light_intensity_bp
from REST_API.routes.lightIntensityPrediction_routes import light_intensity_predictions_bp
from REST_API.routes.airHumidityPrediction_routes import air_humidity_predictions_bp
from REST_API.routes.soilHumidityPrediction_routes import soil_humidity_predictions_bp
from REST_API.routes.measurementPrediction_routes import measurement_predictions_bp
from REST_API.routes.temperaturePrediction_routes import temperature_predictions_bp
from REST_API.routes.waterPumpPrediction_routes import water_pump_predictions_bp
from REST_API.routes.modelActivation_routes import model_activation_bp

app = Flask(__name__)
CORS(app, resources={r"/<path:everything>": {"origins":"http://159.89.1.205:8080"}}, supports_credentials=True, expose_headers=[], allow_headers=["Content-Type"])


app.register_blueprint(measurement_bp)
app.register_blueprint(water_pump_bp)
app.register_blueprint(temperature_bp)
app.register_blueprint(soil_humidity_bp)
app.register_blueprint(air_humidity_bp)
app.register_blueprint(light_intensity_bp)

app.register_blueprint(light_intensity_predictions_bp)
app.register_blueprint(air_humidity_predictions_bp)
app.register_blueprint(soil_humidity_predictions_bp)
app.register_blueprint(measurement_predictions_bp)
app.register_blueprint(temperature_predictions_bp)
app.register_blueprint(water_pump_predictions_bp)
app.register_blueprint(model_activation_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False) 