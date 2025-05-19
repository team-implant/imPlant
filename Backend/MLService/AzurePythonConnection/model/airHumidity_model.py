from pydantic import BaseModel # type: ignore
from datetime import datetime

class AirHumidity(BaseModel):
    Id: int
    AirHumidity: float
    Timestamp: datetime