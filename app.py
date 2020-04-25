from modules.lin_regress import linreg
from modules.svm import svm
from modules.kmeans import kmeans
from modules.logistic import logreg
from modules.bayes import nb
from modules.utils import load_data
from flask import Flask, request, jsonify, render_template, abort
from flask_cors import CORS
from io import StringIO
from modules.utils import formatFrame
from modules.session import Session
from modules.charts import charts
import os.path
import json
import os
import pandas as pd
app = Flask(__name__)
if not os.path.exists("uploads"):
    os.makedirs("uploads")

sess = Session()
algos = {
    'svm': svm,
    'linreg': linreg,
    'kmeans': kmeans,
    'logreg': logreg,
    'nb': nb
}
services = ['uploads', 'train', 'test']

cors = CORS(app)

@app.route('/', methods=['GET'])
def test():
    return "Interactive ML App Server"

exts = ['csv', 'json', 'yaml', 'yml']
@app.route('/uploads/<string:upload_name>', methods=['POST'])
def upload(upload_name):
    if request.method == 'POST':
        data = request.files['file']
        ext = data.filename.split('.')[1]
        if(ext in exts):
            if not os.path.exists(f'uploads/{upload_name}'):
                os.makedirs(f'uploads/{upload_name}')
            data.save(f'uploads/{upload_name}/{data.filename}')
            sess.set(algo = upload_name,path=path,ext = ext) 
            return jsonify({'response': 'File uploaded success!'})
        else:
            abort(404)

@app.route('/dataset', methods=["POST"])
def createFrame():
    state = {}
    #data = StringIO(request.json["data"], '\r')
    path = sess.get(f'{train_name}_path')
    state["frame"] = pd.read_csv(path, engine="python")
    return jsonify(formatFrame(state))

@app.route('/train/<string:train_name>', methods=['POST'])
def train(train_name):
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

@app.route('/visualize/<string:chart>', methods=['GET'])
def visualize(chart):
    row = request.get_json()
    path = sess.get(f'{train_name}_path')
    ext = sess.get(f'{train_name}_ext') 
    chart = getChart(row, ext, path)



if __name__ == "__main__":
    app.run(debug=True)
