import pandas as pd
from AzurePythonConnection.services.lightIntensity_service import get_light_Intensity

def fetch_light_intensity_data():
    data = get_light_Intensity()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df