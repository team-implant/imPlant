from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_measurements():
    rows = []
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT          [Id],
                             [Temperature],
                             [AirHumidity],
                             [SoilHumidity],
                             [Light],
                             [Timestamp]
            FROM [dbo].[MeasurementData]
        """)
        for row in cursor.fetchall():
            rows.append({
                "Id": row.Id,
                "Temperature": row.Temperature,
                "AirHumidity": row.AirHumidity,
                "SoilHumidity": row.SoilHumidity,
                "Light": row.Light,
                "Timestamp": row.Timestamp
            })
    return rows

def get_measurement_by_id(measurement_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT          [Id],
                             [Temperature],
                             [AirHumidity],
                             [SoilHumidity],
                             [Light],
                             [Timestamp]
            FROM [dbo].[MeasurementData]
            WHERE Id = ?
        """, measurement_id)
        row = cursor.fetchone()
        if row:
            return {
                "Id": row.Id,
                "Temperature": row.Temperature,
                "AirHumidity": row.AirHumidity,
                "SoilHumidity": row.SoilHumidity,
                "Light": row.Light,
                "Timestamp": row.Timestamp
            }
        return None

def insert_prediction_result(prediction):
    """
    Insert a prediction result into the PredictionResults table.
    prediction: dict with keys:
        Temperature, AirHumidity, SoilHumidity, IrrigationRecommendation, LightIntensity, PlantHealth, Timestamp, PlantId (optional)
    """
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO PredictionResults
                (Temperature, AirHumidity, SoilHumidity, IrrigationRecommendation, LightIntensity, PlantHealth, Timestamp, PlantId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            prediction.get("Temperature"),
            prediction.get("AirHumidity"),
            prediction.get("SoilHumidity"),
            prediction.get("IrrigationRecommendation"),
            prediction.get("LightIntensity"),
            prediction.get("PlantHealth"),
            prediction.get("Timestamp"),
            prediction.get("PlantId"),
        ))
        conn.commit()
    # Optionally log
    print("Inserted prediction result into database.")
    
def insert_prediction_results(predictions, timestamp=None, plant_id=None, batch=None):
    """
    Insert multiple prediction results into the PredictionResults table.
    predictions: dict, e.g. {"Temperature": 23.5, "SoilHumidity": 40.2, ...}
    timestamp: datetime, optional (default: now)
    plant_id: int or None
    batch: int or None (if None, use int(time.time()))
    """
    import time
    from datetime import datetime

    if timestamp is None:
        timestamp = datetime.utcnow()
    if batch is None:
        batch = int(time.time())

    with get_conn() as conn:
        cursor = conn.cursor()
        for prediction_type, value in predictions.items():
            cursor.execute("""
                INSERT INTO PredictionResults
                    (prediction_type, value, timestamp, plant_id, batch)
                VALUES (?, ?, ?, ?, ?)
            """, (
                prediction_type,
                float(value),
                timestamp,
                plant_id,
                batch
            ))
        conn.commit()
    print("Inserted prediction results into database.")

if __name__ == "__main__":
    # Example: Insert dummy prediction results
    from datetime import datetime

    dummy_predictions = {
        "Temperature": 22.5,
        "SoilHumidity": 45.3,
        "AirHumidity": 55.1,
        "LightIntensity": 120.0
    }
    # Use current UTC time for timestamp, plant_id=None (no FK), batch=12345
    insert_prediction_results(
        predictions=dummy_predictions,
        timestamp=datetime.now().astimezone(),  # timezone-aware
        plant_id=None,  # or use a valid PlantId from your Plants table
        batch=12345
    )
    print("Dummy prediction results inserted.")