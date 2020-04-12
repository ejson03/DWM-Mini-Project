import numpy as np
from sklearn.cluster import KMeans
from .utils import load_data


class kmeans:
    def __init__(self):
        self.clf = None
        self.k = None

    def train(self, *args):
        data = load_data()
        self.k = args[0]
        self.clf = KMeans(n_clusters=args[2], init='random',
                    n_init=10, max_iter=300, 
                    tol=1e-04, random_state=0)

        self.clf.fit(data)
        return {
            'centers' : self.clf.cluster_centers_,
            'labels': self.clf.labels_,
        }

    def pointTest(data):
        x = np.array(data["x"], dtype='float')
        y = np.array(data["y"], dtype='float')

        if len(x) == 0:
            return {
                'centroids': [],
                'points': []
            }

        D = np.array([x, y]).T
        k = min(self.k, D.shape[0])
        clf = self.clf.fit(D)
        labels, centroids = clf.labels_, clf.cluster_centers_
        
        output_data = {
            'centroids': [{'x': centroids[i, 0], 'y': centroids[i, 1], 'label': i} for i in range(len(centroids))],
            'points': [{'x': D[i, 0], 'y': D[i, 1], 'label': int(labels[i])} for i in range(len(labels))]
        }

        return output_data

