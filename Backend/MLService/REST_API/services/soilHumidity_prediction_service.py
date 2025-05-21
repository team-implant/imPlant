from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_soil_humidity_predictions():
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, Value , Timestamp FROM PredictionResults as a WHERE prediction_type = 'SoilHumidity' AND Batch = (SELECT MAX(Batch) FROM PredictionResults as b WHERE a.Id = b.Id)")
        rows = cursor.fetchall()
        return [
            {"Id": row.Id, "SoilHumidity": row.Value, "Timestamp": row.Timestamp}
            for row in rows
        ]
    
    
def save_soil_prediction_results(predictions, plant_id=None, batch=None):
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


    with get_conn() as conn:
        cursor = conn.cursor()
        for prediction in predictions:
            cursor.execute("""
                INSERT INTO PredictionResults
                    (prediction_type, value, timestamp, plant_id, batch)
                VALUES (?, ?, ?, ?, ?)
            """, (
                "SoilHumidity",
                prediction.get("predictedSoilHumidity"),
                prediction.get("timestamp"),
                plant_id,
                batch
            ))
        conn.commit()
