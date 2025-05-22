import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
from ML.data.measurement_data import fetch_measurement_data
from ML.utills.jsonify import jsonify_predictions

def run_soil_humidity_gradient_boosting(debug=True, use_preset_params=True):
    df = fetch_measurement_data()
    df = df.sort_values("Timestamp")
    df["Hour"] = df["Timestamp"].dt.hour
    df["DayOfWeek"] = df["Timestamp"].dt.dayofweek

    feature_cols = ["Temperature", "AirHumidity", "Light", "Hour", "DayOfWeek"]
    X = df[feature_cols]
    y = df["SoilHumidity"]

    split_idx = int(len(df) * 0.75)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    preset_params = {'n_estimators': 200, 'max_depth': 3, 'learning_rate': 0.1}
    best_params = {'n_estimators': None, 'max_depth': None, 'learning_rate': None}
    best_score = -np.inf

    if not use_preset_params:
        n_estimators = [100, 200, 300]
        max_depths = [2, 3, 4]
        learning_rates = [0.05, 0.1, 0.2]
        for e in n_estimators:
            if debug: print(f"Fitting for: {e} estimators")
            for d in max_depths:
                if debug: print(f"  max depth: {d}")
                for r in learning_rates:
                    if debug: print(f"    learning rate: {r}")
                    gbt = GradientBoostingRegressor(
                        n_estimators=e, max_depth=d, learning_rate=r, random_state=42
                    )
                    gbt.fit(X_train, y_train)
                    score = gbt.score(X_test, y_test)
                    if best_score < score:
                        if debug: print(f"      New best score: {score}")
                        best_params['n_estimators'] = e
                        best_params['max_depth'] = d
                        best_params['learning_rate'] = r
                        best_score = score
    else:
        best_params = preset_params

    print("Best model parameters:")
    print(f"n_estimators: {best_params['n_estimators']}")
    print(f"max_depth: {best_params['max_depth']}")
    print(f"learning_rate: {best_params['learning_rate']}")

    model = GradientBoostingRegressor(
        n_estimators=best_params['n_estimators'],
        max_depth=best_params['max_depth'],
        learning_rate=best_params['learning_rate'],
        random_state=42
    )
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    print("r^2 on train data is", model.score(X_train, y_train))
    print("r^2 on test data is", model.score(X_test, y_test))
    print("MSE on test data is", mean_squared_error(y_test, y_pred))
    print("Feature importances:", dict(zip(feature_cols, model.feature_importances_)))

    return model, X_test, y_test, y_pred, df, feature_cols, model.feature_importances_

def get_soil_humidity_predictions_json():
    model, X_test, y_test, y_pred, df, feature_cols, importances = run_soil_humidity_gradient_boosting()
    return jsonify_predictions(
        df,
        X_test.index,
        y_pred,
        id_col="Id",
        value_col="predictedSoilHumidity",
        timestamp_col="Timestamp",
        output_value_name="predictedSoilHumidity"
    )