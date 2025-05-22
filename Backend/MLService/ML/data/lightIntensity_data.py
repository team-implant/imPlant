import pandas as pd
from AzurePythonConnection.services.lightIntensity_service import get_light_Intensity
from REST_API.services.general_prediction_service import save_prediction_results

def fetch_light_intensity_data():
    data = get_light_Intensity()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df