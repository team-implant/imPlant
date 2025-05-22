import pandas as pd
from AzurePythonConnection.services.temperature_service import get_temperature
from REST_API.services.general_prediction_service import save_prediction_results

def fetch_temperature_data():
    data = get_temperature()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df