from AzurePythonConnection.DbConnection.DbConnection import get_conn

def get_light_Intensity():
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, LightIntensity, Timestamp FROM MeasurementData")
        rows = cursor.fetchall()
        return [
            {"Id": row.Id, "LightIntensity": row.LightIntensity, "Timestamp": row.Timestamp}
            for row in rows
        ]
    
def get_light_intensity_by_id(lightIntensity_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, LightIntensity, Timestamp FROM MeasurementData WHERE Id = ?", (lightIntensity_id,))
        row = cursor.fetchone()
        if row:
            return {"Id": row.Id, "LightIntensity": row.LightIntensity, "Timestamp": row.Timestamp}
        else:
            return None    