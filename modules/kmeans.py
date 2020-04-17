import numpy as np
from sklearn.cluster import KMeans
from .utils import load_data, clean
import json
from sklearn.model_selection import train_test_split


class kmeans:
    def __init__(self):
        self.clf = None
        self.k = None

    def train(self, filepath, fileext, params):
        df = load_data(filepath, fileext)
        df.drop(df.filter(regex="Unname"),axis=1, inplace=True)
        df = clean(df)
        X = df.iloc[1:, :-1]
        Y = df.iloc[1:, -1]
        self.k = params[0]
        self.clf = KMeans(n_clusters=params[0], init='random',
                    n_init=10, max_iter=300, 
                    tol=1e-04, random_state=0)

        self.y = self.clf.fit_predict(X)
        return {
            'centers' : json.dumps(self.clf.cluster_centers_.tolist()),
            'labels': json.dumps(self.clf.labels_.tolist()),
            'preds': json.dumps(self.y.tolist())
        }



  

