from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from ML.data.temperature_data import fetch_temperature_data
from ML.utills.jsonify import jsonify_predictions

def run_temperature_random_forest():
    df = fetch_temperature_data()
    df["TimestampOrdinal"] = df["Timestamp"].map(lambda x: x.toordinal())
    X = df[["TimestampOrdinal"]]
    y = df["Temperature"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
    model = RandomForestRegressor(n_estimators=100, random_state=1)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print("r^2 on train data is", model.score(X_train, y_train))
    print("r^2 on test data is", model.score(X_test, y_test))
    print("MSE on test data is", mean_squared_error(y_test, y_pred))

    return model, X_test, y_test, y_pred, df

def get_temperature_predictions_json():
    model, X_test, y_test, y_pred, df = run_temperature_random_forest()
    return jsonify_predictions(
        df, 
        X_test.index, 
        y_pred, 
        id_col="Id", 
        value_col="predictedTemperature", 
        timestamp_col="Timestamp", 
        output_value_name="predictedTemperature"
    )