from flask import Flask, render_template
import pandas as pd
from io import StringIO
from flask_cors import CORS
from flask import request, Response, jsonify
import json

app = Flask(__name__, static_folder = "./frontend/static", template_folder="./frontend")
CORS(app)
state = {}

@app.route('/', methods=['GET'])
def test():
    return render_template("index.html")

@app.route('/create', methods=["POST"])
def createFrame():
    data = StringIO(request.json["data"], '\r')
    state["frame"] = pd.read_csv(data, engine="python")
    formatFrame()
    return jsonify(formatFrame())


def formatFrame():
    frame_rep = dict()
    frame_rep["columns"] = [{
        "Header": x,
        "accessor": x
    } for x in state["frame"]]
    frame_rep["data"] = json.loads(state["frame"].to_json(orient="records"))
    return frame_rep


if __name__ == '__main__':
    app.run()
