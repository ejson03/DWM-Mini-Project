import numpy as np
from .utils import load_data, clean, one_hot_encode
from sklearn.linear_model import LinearRegression
from sklearn import metrics

class lin_regress:
    def __init__(self):
        self.clf = None

    def train(self, *args):
        df = load_data(filepath, fileext)
        df.reset_index(drop=True, inplace=True)
        df = clean(df)
        X = df.iloc[:, :-1]
        self.labels = X.columns.values.tolist()
        X = X.iloc[1:, :]
        Y = df.iloc[1:, -1]
        xtrain, self.xtest, ytrain, self.ytest = train_test_split(X, Y, test_size=args[0], random_state=42)
       
        clf = LinearRegression()
        clf.fit(xtrain, ytrain)
        return {
            'intercept' : self.clf.intercept_,
            'coef': self.clf.coef_,
        }

    def test(self):
        pred = self.clf.predict(self.xtest)
        return {
            'mae': metrics.mean_absolute_error(self.ytest, pred),
            'mse': metrics.mean_squared_error(self.ytest, pred),
            'rmse': np.sqrt(metrics.mean_squared_error(self.ytest, pred))
        }

    def pointTest(data):
        if len(data['x']) == 0:
            return {
                "pts": [{"x": 0, "y": 0}, {"x": 0, "y": 0}],
                "m": 0,
                "b": 0,
                "residual": 0
            }

        x_ = np.array(data["x"], dtype='float')
        y = np.array(data["y"], dtype='float')

        A = np.ones((x_.shape[0], 2))
        A[:, 0] = x_
        
        x, residuals, _, _ = np.linalg.lstsq(A, y, rcond=None)
        m, b = np.round(x, 2)
        residual = np.round(np.sum(residuals), 2)

        leftPoint = np.floor(np.min(x_))
        leftPoint = {"x": leftPoint, "y": m*leftPoint + b}
        rightPoint = np.ceil(np.max(x_))
        rightPoint = {"x": rightPoint, "y": m*rightPoint + b}

        x = np.round(x, 2)
        y = np.round(m*x + b, 2)
        output_data = {
            "bestFitLine": [leftPoint, rightPoint],
            "m": m,
            "b": b,
            "residual": residual
        }

        return output_data
