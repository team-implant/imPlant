from pydantic import BaseModel # type: ignore
from datetime import datetime

class Temperature(BaseModel):
    Id: int
    Temperature: float
    Timestamp: datetime