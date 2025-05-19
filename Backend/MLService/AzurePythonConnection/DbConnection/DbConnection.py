import pyodbc  # type: ignore
from azure.identity import DefaultAzureCredential # type: ignore
from AzurePythonConnection.config.settings import CONNECTION_STRING 

def get_conn():
    conn = pyodbc.connect(CONNECTION_STRING)
    return conn

