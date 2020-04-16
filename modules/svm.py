import numpy as np
from sklearn.svm import LinearSVC
import pandas as pd
from .utils import load_data, clean, one_hot_encode, label_encoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import json

class svm:
    def __init__(self):
        self.clf = None
        self.xtest = None
        self.ytest = None
        self.labels = None

    def train(self, filepath, fileext, params):
        df = load_data(filepath, fileext)
        df.drop(df.filter(regex="Unname"),axis=1, inplace=True)
        df = clean(df)
        X = df.iloc[1:, :-1]
        Y = df.iloc[1:, -1]
        if (params[1]== "l1"):
            dual = False
        else:
            dual = True
        xtrain, self.xtest, ytrain, self.ytest = train_test_split(X, Y, test_size=float(params[0]), random_state=42)
        self.clf = LinearSVC(penalty=params[1], C=float(params[2]), dual= dual)
        self.clf.fit(xtrain, ytrain)
        return {
            'coef': json.dumps(self.clf.coef_.tolist()),
            'intercept': json.dumps(self.clf.intercept_.tolist()),
            'classes': json.dumps(self.clf.classes_.tolist())
        }

    def test(self):
        pred = self.clf.predict(self.xtest)
        report = classification_report(self.ytest, pred, output_dict=True)
        return report

if __name__ == "__main__":
    svm = svm()
    train = svm.train('../uploads/svm/Sample.csv', 'csv', [0.25, 'l1', 0.80])
    print(train)
    test = svm.test()
    print(test)
   

    



