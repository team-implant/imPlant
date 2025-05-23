import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from ML.data.waterPump_data import fetch_water_pump_data, save_prediction_results

def forecast_water_pump_multi_step(days=7, predictions_per_day=3):
    df = fetch_water_pump_data().sort_values("Timestamp").reset_index(drop=True)

    # Create lag features
    df["WaterPump_t-1"] = df["WaterPumpLevel"].shift(1)
    df["WaterPump_t-2"] = df["WaterPumpLevel"].shift(2)
    df = df.dropna()

    if len(df) < 2:
        raise ValueError("Not enough data to forecast.")

    # Train lag-based model
    X = df[["WaterPump_t-1", "WaterPump_t-2"]]
    y = df["WaterPumpLevel"]
    model = LinearRegression()
    model.fit(X, y)

    # Start with the last two known values
    last_1 = df["WaterPumpLevel"].iloc[-1]
    last_2 = df["WaterPumpLevel"].iloc[-2]
    last_timestamp = df["Timestamp"].iloc[-1]

    total_predictions = days * predictions_per_day
    step_hours = int(24 / predictions_per_day)

    results = []

    for i in range(1, total_predictions + 1):
        next_input = np.array([[last_1, last_2]])
        next_prediction = model.predict(next_input)[0]
        next_time = last_timestamp + pd.Timedelta(hours=step_hours * i)

        results.append({
            "timestamp": next_time.strftime("%Y-%m-%d %H:%M:%S"),
            "predictedWaterPump": round(float(next_prediction), 2),
            "based_on": [round(last_2, 2), round(last_1, 2)]
        })

        # Update lags
        last_2 = last_1
        last_1 = next_prediction

    save_prediction_results("WaterPump",results, plant_id=None, batch=None)

    return results
