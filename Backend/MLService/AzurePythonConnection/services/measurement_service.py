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