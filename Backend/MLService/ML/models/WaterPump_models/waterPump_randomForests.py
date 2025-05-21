from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from ML.data.waterPump_data import fetch_water_pump_data
from ML.utills.jsonify import jsonify_predictions

def run_water_pump_random_forest():
    df = fetch_water_pump_data()
    df["TimestampOrdinal"] = df["Timestamp"].map(lambda x: x.toordinal())
    X = df[["TimestampOrdinal"]]
    y = df["WaterPumpOn"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
    model = RandomForestClassifier(n_estimators=100, random_state=1)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print("Accuracy on train data is", model.score(X_train, y_train))
    print("Accuracy on test data is", model.score(X_test, y_test))

    return model, X_test, y_test, y_pred, df

def get_water_pump_predictions_json():
    model, X_test, y_test, y_pred, df = run_water_pump_random_forest()
    return jsonify_predictions(
        df,
        X_test.index,
        y_pred,
        id_col="Id",
        value_col="predictedWaterPumpOn",
        timestamp_col="Timestamp",
        output_value_name="predictedWaterPumpOn"
    )