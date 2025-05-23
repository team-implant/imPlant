from pydantic import BaseModel # type: ignore
from datetime import datetime

class WaterPump(BaseModel):
    Id: int
    WaterPumpLevel: float
    Timestamp: datetime