import pyodbc
import struct
from azure.identity import DefaultAzureCredential
from AzurePythonConnection.config.settings import CONNECTION_STRING 

def get_conn():
    conn = pyodbc.connect(CONNECTION_STRING)
    return conn

