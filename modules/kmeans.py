import numpy as np
from sklearn.cluster import KMeans

class svm:
    def __init__(self):
        self.clf = None
        self.xtest = None
        self.ytest = None

    def train(self, *args):
        data = load_data()
        X = df.iloc[:, :-1]
        Y = df.iloc[:, -1]
        xtrain, ytrain, self.xtest, self.ytest = train_test_split(X, Y, test_size=args[0], random_state=42)
        self.clf = SVC(kernel='linear', penalty=args[1], C=args[2])

        self.clf.fit(xtrain, ytrain)
        return {
            'coef' : self.clf.coef_,
            'intercept': self.clf.intercept_,
            'classes': self.clf.classes_
        }

    def test(self):

    def pointTest(data):
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

