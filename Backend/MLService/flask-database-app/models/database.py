import pymssql
from config.config import DATABASE_CONFIG

def get_db_connection():
    connection = pymssql.connect(
        server=DATABASE_CONFIG['host'],
        user=DATABASE_CONFIG['user'],
        password=DATABASE_CONFIG['password'],
        database=DATABASE_CONFIG['database'],
        port=DATABASE_CONFIG['port']
    )
    return connection