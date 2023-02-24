import numpy as np
from joblib import load
import re


def keepOnlyChars(str):
    return " ".join(re.findall("[A-Za-z]+", str))


def removeHtmlTgs(str):
    return re.sub("<[^>]+>", "", str)


def keepOnlyAscii(str):
    return re.sub(r'[^\x00-\x7f]', r'', str)


vectorizer = load('../model/vectorizer.joblib')
tfidf_transformer = load('../model/tfidf.joblib')
model = load('../model/svm_linear.joblib')


def transform_predict(data):
    data = np.vectorize(removeHtmlTgs)(data)
    data = np.vectorize(keepOnlyAscii)(data)
    data = np.vectorize(keepOnlyChars)(data)

    data_counts = vectorizer.transform(data)
    data_tfidf = tfidf_transformer.transform(data_counts)

    predictions = model.predict(data_tfidf)

    return predictions
