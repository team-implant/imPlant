from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_soil_humidity():
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, SoilHumidity, Timestamp FROM MeasurementData")
        rows = cursor.fetchall()
        return [
            {"Id": row.Id, "SoilHumidity": row.SoilHumidity, "Timestamp": row.Timestamp}
            for row in rows
        ]
    
def get_soil_humidity_by_id(soil_humidity_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT Id, SoilHumidity, Timestamp
            FROM MeasurementData
            WHERE Id = ?
        """, soil_humidity_id)
        row = cursor.fetchone()
        if row:
            return {
                "Id": row.Id,
                "SoilHumidity": row.SoilHumidity,
                "Timestamp": row.Timestamp
            }
        return None   
