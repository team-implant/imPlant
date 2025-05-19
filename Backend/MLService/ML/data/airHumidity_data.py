import pandas as pd
from AzurePythonConnection.services.airHumidity_service import get_air_humidity

def fetch_air_humidity_data():
    data = get_air_humidity()
    df = pd.DataFrame(data)
    return df