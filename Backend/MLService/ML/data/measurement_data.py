import pandas as pd
from AzurePythonConnection.services.measurement_service import get_measurements

def fetch_measurement_data():
    data = get_measurements()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df