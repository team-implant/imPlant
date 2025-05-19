import pandas as pd
from AzurePythonConnection.services.soilHumidity_service import get_soil_humidity

def fetch_soil_humidity_data():
    data = get_soil_humidity()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])

    return df