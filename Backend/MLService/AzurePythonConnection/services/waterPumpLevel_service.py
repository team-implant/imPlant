from AzurePythonConnection.DbConnection.DbConnection import get_conn
from AzurePythonConnection.model.waterPump_model import WaterPump

def get_water_pumps_level():
    rows = []
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT Id, Level, MinLevel, MaxLevel, Timestamp
            FROM WaterPumps
        """)
        for row in cursor.fetchall():
            water_pump = WaterPump(
                Id=row.Id,
                Level=row.Level,
                MinLevel=row.MinLevel,
                MaxLevel=row.MaxLevel,
                Timestamp=row.Timestamp
            )
            rows.append(water_pump.dict())
    return rows

def get_water_pump_level_by_id(water_pump_id):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT Id, Level, MinLevel, MaxLevel, Timestamp
            FROM WaterPumps
            WHERE Id = ?
        """, water_pump_id)
        row = cursor.fetchone()
        if row:
            return WaterPump(
                Id=row.Id,
                Level=row.Level,
                MinLevel=row.MinLevel,
                MaxLevel=row.MaxLevel,
                Timestamp=row.Timestamp
            ).dict()
        return None