from modules.lin_regress import linreg
from modules.svm import svm
from modules.kmeans import kmeans
from modules.logistic import logreg
from modules.bayes import nb
from flask import Flask, request, jsonify, render_template, abort, session
from flask_cors import CORS
import os.path
import json
import os

app = Flask(__name__)
if not os.path.exists("uploads"):
    os.makedirs("uploads")

file_det = {}

algos = {
    'svm': svm,
    'linreg': linreg,
    'kmeans': kmeans,
    'logreg': logreg,
    'nb': nb
}
services = ['uploads', 'train', 'test']

cors = CORS(app, resources={
    r'/{}/{}'.format(service,algo): {"origins": "*"} for service in services for algo in algos
}, expose_headers='Authorization')


@app.route('/', methods=['GET'])
def test():
    return "Hello"

exts = ['csv', 'json', 'yaml', 'yml']
@app.route('/uploads/<string:upload_name>', methods=['GET', 'POST'])
def upload(upload_name):
    if request.method == 'POST':
        data = request.files['file']
        ext = data.filename.split('.')[1]
        if(ext in exts):
            if not os.path.exists(f'uploads/{upload_name}'):
                os.makedirs(f'uploads/{upload_name}')
            data.save(f'uploads/{upload_name}/{data.filename}')
            file_det[f'{upload_name}_path'] = f'uploads/{upload_name}/{data.filename}'
            file_det[f'{upload_name}_type'] = ext
            return jsonify({'response': 'File uploaded success!'})
        else:
            abort(404)

@app.route('/train/<string:train_name>', methods=['POST'])
def train(train_name):
    try:
        service_class = algos[train_name]
    except:
        # service does not exist
        return None, 401
    
    params = request.get_json()
    print(params)
    algo = service_class()
    train = algo.train(file_det[f'{train_name}_path'], file_det[f'{train_name}_type'],params)
    print(train)
    return train

@app.route('/test/<string:test_name>', methods=['POST'])
def testroute(test_name):
    try:
        service_class = algos[test_name]
    except:
        # service does not exist
        return None, 401
    
    algo = service_class()
    print(test_name)
    test = algo.test()
    return jsonify(test)



if __name__ == "__main__":
    app.run(debug=True)
