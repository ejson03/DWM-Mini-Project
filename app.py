from modules.lin_regress import lin_regress
from modules.svm import svm
from modules.kmeans import kmeans
from modules.lda import lda
from flask import Flask, request, jsonify, render_template, abort, session
from flask_cors import CORS
import os.path
import json

app = Flask(__name__)
app.secret_key = "abc"

algos = {
    'svm': svm,
    'lr': lin_regress,
    'kmeans': kmeans,
    'lda': lda
}
services = ['train', 'test', 'pointtest']

cors = CORS(app, resources={
    r'/{}/{}'.format(service,algo): {"origins": "*"} for service in services for algo in algos 
}, expose_headers='Authorization')


@app.route('/', methods=['GET'])
def test():
    return "Hello"

save_path = '/uploads/'
exts = ['csv', 'json', 'yaml']
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        data = request.files['file']
        ext = data.filename.split('.')[1]
        if(ext in exts):
            data.save('uploads/' + data.filename)
            session['file'] = f'uploads/{data.filename}'
            session['filetype'] = ext
            print(session)
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
    algo = service_class()
    train = algo.train('./uploads/Sample.csv', 'csv',params)
    print(train)
    response = app.response_class(
        response=json.dumps(train),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/test/<string:test_name>', methods=['POST'])
def testroute(test_name):
    try:
        service_class = algos[test_name]
    except:
        # service does not exist
        return None, 401
    
    algo = service_class()
    test = algo.test()
    return jsonify(test)


@app.route('/pointtest/<string:point_name>', methods=['POST'])
def pointtest(point_name):
    try:
        service_func = algos[point_name]
    except:
        # service does not exist
        return None, 401
    
    data = request.get_json()
    output_data = service_func(data)
    return jsonify(output_data)


if __name__ == "__main__":
    app.run(debug=True)
