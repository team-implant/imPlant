from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_air_humidity():
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, AirHumidity, Timestamp FROM MeasurementData")
        rows = cursor.fetchall()
        return [
            {"Id": row.Id, "AirHumidity": row.AirHumidity, "Timestamp": row.Timestamp}
            for row in rows
        ]
    
def get_air_humidity_by_id(air_humidity_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, AirHumidity, Timestamp FROM MeasurementData WHERE Id = ?", air_humidity_id)
        row = cursor.fetchone()
        if row:
            return {"Id": row.Id, "AirHumidity": row.AirHumidity, "Timestamp": row.Timestamp}
        return None    