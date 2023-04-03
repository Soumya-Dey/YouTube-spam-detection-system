from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import numpy as np
from utils import transform_predict

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.errorhandler(Exception)
def server_error(err):
    print(err)
    return jsonify({"errors": [{"msg": "Server error occured. Please try again!"}]}), 500


@app.route("/")
@cross_origin()
def root():
    return jsonify(msg='Server running on => http://localhost:5000')


@app.route("/predict", methods=['POST'])
@cross_origin()
def predict1():
    if request.method == 'POST':
        body = request.get_json()
        data = np.array(body['comments'])
        comments = [item['comment'] for item in data]

        prediction = transform_predict(comments)

        result = []
        for i, item in enumerate(data):
            result.append(
                {"id": item['id'], "author": item["author"], "comment": item['comment'], "class": 'HAM' if prediction[i] == 0 else 'SPAM'})

        # print(result)

        return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
