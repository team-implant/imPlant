import pandas as pd
from AzurePythonConnection.services.waterPumpLevel_service import get_water_pumps_level

def fetch_water_pump_data():
    data = get_water_pumps_level()
    df = pd.DataFrame(data)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"])
    return df