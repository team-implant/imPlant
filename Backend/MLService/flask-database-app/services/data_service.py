from models.database import get_db_connection

def fetch_data_from_db(query, params=None):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(query, params or ())
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return result
    finally:
        cursor.close()
        connection.close()