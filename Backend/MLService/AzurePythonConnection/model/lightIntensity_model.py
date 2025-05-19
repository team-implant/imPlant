from pydantic import BaseModel # type: ignore
from datetime import datetime

class LightIntensity(BaseModel):
    Id: int
    Light: float
    Timestamp: datetime