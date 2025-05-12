from models.database import get_db_connection

def test_connection():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT 1")  
        result = cursor.fetchone()
        print("Connection successful! Test query result:", result)
    except Exception as e:
        print("Connection failed:", e)
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()

if __name__ == "__main__":
    test_connection()