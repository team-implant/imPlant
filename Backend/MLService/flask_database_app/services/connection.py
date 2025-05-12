import pymssql
from flask_database_app.config.config import DATABASE_CONFIG

def get_db_connection():
    try:
        conn = pymssql.connect(
            server=DATABASE_CONFIG['host'],
            user=DATABASE_CONFIG['user'],
            password=DATABASE_CONFIG['password'],
            database=DATABASE_CONFIG['database'],
            port=DATABASE_CONFIG['port']
        )
        print("==Connection established==")
        return conn
    except pymssql.DatabaseError as e:
        print(f"==Connection failed: {e}==")
        return None
