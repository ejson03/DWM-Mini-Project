import numpy as np
from .utils import load_data, clean, one_hot_encode
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn import metrics
import json

class lin_regress:
    def __init__(self):
        self.clf = None

    def train(self, filepath, fileext, params):
        df = load_data(filepath, fileext)
        df.reset_index(drop=True, inplace=True)
        df = clean(df)
        X = df.iloc[:, :-1]
        self.labels = X.columns.values.tolist()
        X = X.iloc[1:, :]
        Y = df.iloc[1:, -1]
        xtrain, self.xtest, ytrain, self.ytest = train_test_split(X, Y, test_size=float(params[0]), random_state=42)
       
        clf = LinearRegression()
        clf.fit(xtrain, ytrain)
        return {
            'intercept' : self.clf.intercept_,
            'coef': json.dumps(self.clf.coef_.tolist()),
        }

    def test(self):
        pred = self.clf.predict(self.xtest)
        return {
            'mae': metrics.mean_absolute_error(self.ytest, pred),
            'mse': metrics.mean_squared_error(self.ytest, pred),
            'rmse': np.sqrt(metrics.mean_squared_error(self.ytest, pred))
        }

   
