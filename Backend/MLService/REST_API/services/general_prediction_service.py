from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_predictions(measurementType):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, Value , Timestamp FROM PredictionResults WHERE Batch = (SELECT MAX(Batch) FROM PredictionResults WHERE prediction_type = ?)", measurementType)
        rows = cursor.fetchall()
        return [
            {"Id": row.Id, measurementType: row.Value, "Timestamp": row.Timestamp}
            for row in rows
        ]
    
    
def save_prediction_results(measurementType, predictions, plant_id=None, batch=None):
    """
    Insert multiple prediction results into the PredictionResults table.
    predictions: dict, e.g. {"Temperature": 23.5, "SoilHumidity": 40.2, ...}
    timestamp: datetime, optional (default: now)
    plant_id: int or None
    batch: int or None (if None, use int(time.time()))
    """
    import time
    from datetime import datetime

    if batch is None:
        batch = int(time.time())
    
    def stringToColumnName(argument):
        switcher = {
            "SoilHumidity": "predictedSoilHumidity",
            "AirHumidity": "predictedAirHumidity",
            "Temperature": "predictedTemperature",
            "LightIntensity": "predictedLightIntensity",
            "WaterPump": "predictedWaterPump"
        }

        return switcher.get(argument)

    with get_conn() as conn:
        cursor = conn.cursor()
        for prediction in predictions:
            cursor.execute("""
                INSERT INTO PredictionResults
                    (prediction_type, value, timestamp, plant_id, batch)
                VALUES (?, ?, ?, ?, ?)
            """, (
                measurementType,
                prediction.get(stringToColumnName(measurementType)),
                prediction.get("timestamp"),
                plant_id,
                batch
            ))
        conn.commit()
