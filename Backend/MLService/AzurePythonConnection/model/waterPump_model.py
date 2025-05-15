from pydantic import BaseModel # type: ignore
from datetime import datetime

class WaterPump(BaseModel):
    Id: int
    Level: float
    MinLevel: int
    MaxLevel: int
    Timestamp: datetime