import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from ML.data.lightIntensity_data import fetch_light_intensity_data

def run_light_intensity_regression():
    df = fetch_light_intensity_data()
    df["TimestampOrdinal"] = df["Timestamp"].map(lambda x: x.toordinal())
    X = df[["TimestampOrdinal"]]
    y = df["LightIntensity"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=1)
    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    print("r^2 on train data is", model.score(X_train, y_train))
    print("r^2 on test data is", model.score(X_test, y_test))
    print("MSE on test data is", mean_squared_error(y_test, y_pred))

    return model, X_test, y_test, y_pred, df