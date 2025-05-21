import pandas as pd
from AzurePythonConnection.services.soilHumidity_service import get_soil_humidity
from REST_API.services.soilHumidity_prediction_service import save_soil_prediction_results

def fetch_soil_humidity_data():
    data = get_soil_humidity()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])

    return df
