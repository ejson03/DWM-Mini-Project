from modules.lin_regress import linRegression
from modules.svm import svm
from modules.kmeans import kmeans
from modules.lda import lda
from flask import Flask, request, jsonify, render_template, abort
from flask_cors import CORS
import os.path

app = Flask(__name__)
app.secret_key = "abc"

ml = {
    'svm': svm,
    'lin_regress': linRegression,
    'kmeans': kmeans,
    'lda': lda
}



cors = CORS(app, resources={
    r'/{}'.format(service): {"origins": "*"} for service in services
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
            session['file'] = f'uploads/{data}'
            session['file-type'] = ext
            return jsonify({'response': 'File uploaded success!'})
        else:
            abort(404)

@app.route('/train/<string:service_name>', methods=['POST'])
def service(service_name):
    try:
        service_class = services[service_name]
    except:
        # service does not exist
        return None, 401
    
    params = request.get_json()
    algo = service_class()
    train = algo.train(params)
    return jsonify(train)

@app.route('/test/<string:service_name>', methods=['POST'])
def service(service_name):
    try:
        service_class = services[service_name]
    except:
        # service does not exist
        return None, 401
    
    algo = service_class()
    test = algo.test()
    return jsonify(test)


@app.route('/pointtest//<string:service_name>', methods=['POST'])
def service(service_name):
    try:
        service_func = services[service_name]
    except:
        # service does not exist
        return None, 401
    
    data = request.get_json()
    output_data = service_func(data)
    return jsonify(output_data)


if __name__ == "__main__":
    app.run(debug=True)
