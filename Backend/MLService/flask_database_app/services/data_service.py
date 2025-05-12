from flask_database_app.services.connection import get_db_connection

def fetch_measurement_data():
    conn = get_db_connection()
    if not conn:
        return []

    cursor = conn.cursor(as_dict=True)
    query = """
        SELECT TOP (10) [Id],
                        [Temperature],
                        [AirHumidity],
                        [SoilHumidity],
                        [Light],
                        [Timestamp]
        FROM [dbo].[MeasurementData]
        ORDER BY [Timestamp] DESC
    """

    try:
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    finally:
        conn.close()