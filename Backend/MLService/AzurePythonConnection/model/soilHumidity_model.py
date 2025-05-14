from pydantic import BaseModel # type: ignore
from datetime import datetime

class SoilHumidity(BaseModel):
    Id: int
    SoilHumidity: float
    Timestamp: datetime