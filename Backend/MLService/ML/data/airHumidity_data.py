import pandas as pd
from AzurePythonConnection.services.airHumidity_service import get_air_humidity
from REST_API.services.general_prediction_service import save_prediction_results

def fetch_air_humidity_data():
    data = get_air_humidity()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df