import pandas as import pd 
from pandas.io.json import json_normalize 
import yaml 

def load_data():
    if (session['file-type'] == 'csv'):
        return pd.read_csv(session['file'], 
                header=None, 
                 index_col=False)
    elif(session['file-type'] == 'json'):
        return pd.read_json(session['file'])
    else:
        with open(session['file'], 'r') as f:
            return json_normalize(yaml.load(f))