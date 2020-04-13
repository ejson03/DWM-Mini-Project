import numpy as np
from sklearn.svm import LinearSVC
import pandas as pd
from .utils import load_data, clean, one_hot_encode, label_encoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

       
def makeLine(xx, yy):
    leftPoint = {'x': xx[0], 'y': np.round(yy[0], 4)}
    rightPoint = {'x': xx[1], 'y': np.round(yy[1], 4)}
    return leftPoint, rightPoint


def getColors(clf, xx, yy_up, yy_down):
    colors = ['#000000']
    predicted = clf.predict([[xx[0], yy_up[0]]])
    if np.max(predicted) == 1:
        colors.append('#FF0000')
    else:
        colors.append('#0000FF')

    predicted = clf.predict([[xx[0], yy_down[0]]])
    if np.max(predicted) == 1:
        colors.append('#FF0000')
    else:
        colors.append('#0000FF')
    
    return colors

class svm:
    def __init__(self):
        self.clf = None
        self.xtest = None
        self.ytest = None
        self.labels = None

    def train(self, filepath, fileext, *args):
        df = load_data(filepath, fileext)
        df.reset_index(drop=True, inplace=True)
        df = clean(df)
        X = df.iloc[:, :-1]
        self.labels = X.columns.values.tolist()
        X = X.iloc[1:, :]
        Y = df.iloc[1:, -1]
        xtrain, self.xtest, ytrain, self.ytest = train_test_split(X, Y, test_size=args[0], random_state=42)
        self.clf = LinearSVC(penalty=args[1], C=args[2])
        self.clf.fit(xtrain, ytrain)
        return {
            'coef' : self.clf.coef_,
            'intercept': self.clf.intercept_,
            'classes': self.clf.classes_
        }

    def test(self):
        pred = self.clf.predict(self.xtest)
        report = classification_report(self.ytest, pred, output_dict=True)
        return report


    def pointTest(self, data, eps=1e-3):
        x = np.array(data["x"], dtype='float')
        y = np.array(data["y"], dtype='float')
        D = np.array([x, y]).T
        labels = np.array(data["labels"], dtype=np.int32)
        uniqueLabels = np.unique(labels)
        if len(uniqueLabels) != 2:
            zero = {'x': 0, 'y': 0}
            return {
                "boundaryLine": [zero] * 2,
                "upperLine": [zero] * 2,
                "lowerLine": [zero] * 2,
                "colors": ['#000000', '#000000', '#000000'],
                "accuracy": 'N/A'
            }

        self.clf.fit(D, labels)
        acc = 100 * np.sum(self.clf.predict(D) == labels) / labels.shape[0]
        acc = np.round(acc, 2)

        w = self.clf.coef_[0]
        m = -w[0] / (w[1] + eps)
        b = -self.clf.intercept_[0] / (w[1] + eps)

        xx = np.array([np.floor(np.min(x)) - 1, np.ceil(np.max(x)) + 1])
        yy = m * xx + b

        margin = 1 / np.sqrt(np.sum(clf.coef_ ** 2))
        yy_down = yy - np.sqrt(1 + m ** 2) * margin
        yy_up = yy + np.sqrt(1 + m ** 2) * margin
        
        leftPoint, rightPoint = makeLine(xx, yy)
        upperLeft, upperRight = makeLine(xx, yy_up)
        downLeft, downRight = makeLine(xx, yy_down)
        colors = getColors(self.clf, xx, yy_up, yy_down)
        
        output_data = {
            "boundaryLine": [leftPoint, rightPoint],
            "upperLine": [upperLeft, upperRight],
            "lowerLine": [downLeft, downRight],
            "colors": colors,
            "accuracy": f'{acc}%'
        }

        return output_data

if __name__ == "__main__":
    svm = svm()
    train = svm.train('../uploads/Sample.csv', 'csv', 0.25, 'l2', 0.80)
    print(train)
    test = svm.test()
    print(test)
   

    



