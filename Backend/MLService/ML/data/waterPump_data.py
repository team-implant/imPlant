import pandas as pd
from AzurePythonConnection.services.waterPumpLevel_service import get_water_pumps_level
from REST_API.services.general_prediction_service import save_prediction_results

def fetch_water_pump_data():
    data = get_water_pumps_level()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df