import json

def jsonify_predictions(df, indices, predictions, id_col="Id", value_col="PredictedValue", timestamp_col="Timestamp", output_value_name=None):
    results = []
    for idx, pred in zip(indices, predictions):
        result = {
            "id": int(df.loc[idx, id_col]) if id_col in df.columns else int(idx),
            (output_value_name or value_col): float(pred),
            "timestamp": df.loc[idx, timestamp_col].isoformat() if hasattr(df.loc[idx, timestamp_col], "isoformat") else str(df.loc[idx, timestamp_col])
        }
        results.append(result)
    return json.dumps(results, indent=2)
