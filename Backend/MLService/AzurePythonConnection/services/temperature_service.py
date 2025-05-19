from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_temperature():
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, Temperature, Timestamp FROM MeasurementData")
        rows = cursor.fetchall()
        return [
            {"Id": row.Id, "Temperature": row.Temperature, "Timestamp": row.Timestamp}
            for row in rows
        ]
    
def get_temperature_by_id(temperature_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT Id, Temperature, Timestamp
            FROM MeasurementData
            WHERE Id = ?
        """, temperature_id)
        row = cursor.fetchone()
        if row:
            return {
                "Id": row.Id,
                "Temperature": row.Temperature,
                "Timestamp": row.Timestamp
            }
        return None