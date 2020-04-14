import numpy as np
from sklearn.cluster import KMeans
from .utils import load_data
import json
from sklearn.model_selection import train_test_split


class kmeans:
    def __init__(self):
        self.clf = None
        self.k = None

    def train(self, params):
        df = load_data(filepath, fileext)
        df.reset_index(drop=True, inplace=True)
        self.k = params[0]
        self.clf = KMeans(n_clusters=params[0], init='random',
                    n_init=10, max_iter=300, 
                    tol=1e-04, random_state=0)

        self.clf.fit(df)
        return {
            'centers' : json.dumps(self.clf.cluster_centers_.tolist()),
            'labels': json.dumps(self.clf.labels_.tolist()),
        }

    def pointTest(self, data):
        x = np.array(data["x"], dtype='float')
        y = np.array(data["y"], dtype='float')

        if len(x) == 0:
            return {
                'centroids': [],
                'points': []
            }

        k = int(data['k'])
        D = np.array([x, y]).T
        k = min(k, D.shape[0])
        clf = KMeans(n_clusters=k).fit(D)
        labels, centroids = clf.labels_, clf.cluster_centers_

        output_data = {
            'centroids': [{'x': centroids[i, 0], 'y': centroids[i, 1], 'label': i} for i in range(len(centroids))],
            'points': [{'x': D[i, 0], 'y': D[i, 1], 'label': int(labels[i])} for i in range(len(labels))]
        }

        return output_data

