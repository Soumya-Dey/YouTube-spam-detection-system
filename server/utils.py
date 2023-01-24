from joblib import load

vectorizer = load('../model/vectorizer.joblib')
tfidf_transformer = load('../model/tfidf.joblib')
model = load('../model/svm_linear.joblib')


def transform_predict(data):
    data_counts = vectorizer.transform(data)
    data_tfidf = tfidf_transformer.transform(data_counts)

    predictions = model.predict(data_tfidf)

    return predictions
