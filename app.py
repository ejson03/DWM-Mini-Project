from modules.lin_regress import linreg
from modules.svm import svm
from modules.kmeans import kmeans
from modules.logistic import logreg
from modules.bayes import nb
from flask import Flask, request, jsonify, render_template, abort
from flask_cors import CORS
from io import StringIO
from modules.utils import formatFrame
from modules.session import Session
import os.path
import json
import os
import pandas as pd
import sys
base_dir = '.'
if hasattr(sys, '_MEIPASS'):
    base_dir = os.path.join(sys._MEIPASS)
    print(base_dir)

sess = Session()
app = Flask(    __name__, 
            static_folder=os.path.join(base_dir, 'frontend', 'static'),
            template_folder=os.path.join(base_dir, 'frontend')
        )
if not os.path.exists("uploads"):
    os.makedirs("uploads")

algos = {
    'svm': svm,
    'linreg': linreg,
    'kmeans': kmeans,
    'logreg': logreg,
    'nb': nb
}
services = ['uploads', 'train', 'test']

cors = CORS(app)
# , resources={
#     r'/{}/{}'.format(service,algo): {"origins": "*"} for service in services for algo in algos
# }, expose_headers='Authorization')


@app.route('/', methods=['GET'])
def test():
    return render_template("index.html")

exts = ['csv', 'json', 'yaml', 'yml']
@app.route('/uploads/<string:upload_name>', methods=['POST'])
def upload(upload_name):
    print(upload_name)
    if request.method == 'POST':
        data = request.files['file']
        ext = data.filename.split('.')[1]
        if(ext in exts):
            if not os.path.exists(f'uploads/{upload_name}'):
                os.makedirs(f'uploads/{upload_name}')
            data.save(f'uploads/{upload_name}/{data.filename}')
            path = f'uploads/{upload_name}/{data.filename}'
            sess.set(algo = upload_name,path=path,ext = ext) 
            print(sess)
            return jsonify({'response': 'File uploaded success!'})
        else:
            abort(404)

@app.route('/dataset', methods=["POST"])
def createFrame():
    state = {}
    data = StringIO(request.json["data"], '\r')
    state["frame"] = pd.read_csv(data, engine="python")
    return jsonify(formatFrame(state))

@app.route('/train/<string:train_name>', methods=['POST'])
def train(train_name):
    print(train_name)
    try:
        service_class = algos[train_name]
    except:
        # service does not exist
        return None, 401
    
    params = request.get_json()
    algo = service_class()
    path = sess.get(f'{train_name}_path')
    ext = sess.get(f'{train_name}_ext')
    sess.set(algo=train_name, object=algo)
    print(sess)
    train = algo.train(path, ext ,params)
    return train

@app.route('/test/<string:test_name>', methods=['GET'])
def testroute(test_name):
    print(test_name)
    print(sess)   
    algo = sess.get(f'{test_name}')
    test = algo.test()
    return jsonify(test)



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
