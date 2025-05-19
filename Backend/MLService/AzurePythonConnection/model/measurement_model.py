from pydantic import BaseModel # type: ignore
from datetime import datetime

class Measurement(BaseModel):
    Id: int
    Temperature: float
    AirHumidity: float
    SoilHumidity: float
    Light: float  
    Timestamp: datetime
