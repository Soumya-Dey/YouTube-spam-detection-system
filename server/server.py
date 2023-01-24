from flask import Flask, jsonify, request
import numpy as np
from utils import transform_predict

app = Flask(__name__)


@app.errorhandler(Exception)
def server_error(err):
    print(err)
    return jsonify({"errors": [{"msg": "Server error occured. Please try again!"}]}), 500


@app.route("/")
def root():
    return jsonify(msg='Server running on => http://localhost:5000')


@app.route("/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        body = request.get_json()
        data = np.array(body['comments'])

        prediction = transform_predict(data)

        result = []
        for i, comment in enumerate(data):
            result.append(
                {"comment": comment, "class": 'HAM' if prediction[i] == 0 else 'SPAM'})

        print(result)

        return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
