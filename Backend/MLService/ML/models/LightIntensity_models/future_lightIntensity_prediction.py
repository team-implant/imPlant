import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from ML.data.lightIntensity_data import fetch_light_intensity_data, save_prediction_results

def forecast_light_intensity_multi_step(days=7, predictions_per_day=3):
    df = fetch_light_intensity_data().sort_values("Timestamp").reset_index(drop=True)

    # Create lag features
    df["LightIntensity_t-1"] = df["LightIntensity"].shift(1)
    df["LightIntensity_t-2"] = df["LightIntensity"].shift(2)
    df = df.dropna()

    if len(df) < 2:
        raise ValueError("Not enough data to forecast.")

    # Train lag-based model
    X = df[["LightIntensity_t-1", "LightIntensity_t-2"]]
    y = df["LightIntensity"]
    model = LinearRegression()
    model.fit(X, y)

    # Start with the last two known values
    last_1 = df["LightIntensity"].iloc[-1]
    last_2 = df["LightIntensity"].iloc[-2]
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
            "predictedLightIntensity": round(float(next_prediction), 2),
            "based_on": [round(last_2, 2), round(last_1, 2)]
        })

        # Update lags
        last_2 = last_1
        last_1 = next_prediction

    save_prediction_results("LightIntensity",results, plant_id=None, batch=None)

    return results
