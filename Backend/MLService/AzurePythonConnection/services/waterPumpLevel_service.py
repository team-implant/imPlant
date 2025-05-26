from AzurePythonConnection.DbConnection.DbConnection import get_conn
from AzurePythonConnection.model.waterPump_model import WaterPump

def get_water_pumps_level():
    rows = []
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT Id, tank_fill_level, Timestamp FROM MeasurementData")
        for row in cursor.fetchall():
            water_pump = WaterPump(
                Id=row.Id,
                WaterPumpLevel=row.tank_fill_level,
                Timestamp=row.Timestamp
            )
            rows.append(water_pump.dict())
    return rows

def get_water_pump_level_by_id(water_pump_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT Id, Tank_fill_level, Timestamp FROM MeasurementData
            WHERE Id = ?
        """, water_pump_id)
        row = cursor.fetchone()
        if row:
            return WaterPump(
                Id=row.Id,
                WaterPumpLevel=row.tank_fill_level,
                Timestamp=row.Timestamp
            ).dict()
        return None