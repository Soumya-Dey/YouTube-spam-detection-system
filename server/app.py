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
        comments = [item['comment'] for item in data]

        prediction = transform_predict(comments)

        result = []
        for i, item in enumerate(data):
            result.append(
                {"id": item['id'], "comment": item['comment'], "class": 'HAM' if prediction[i] == 0 else 'SPAM'})

        print(result)

        return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
