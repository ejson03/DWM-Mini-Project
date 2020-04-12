import pandas as pd 
from pandas.io.json import json_normalize 
from numpy import nan, zeros
from pandas import get_dummies, Series
import yaml 
import numpy as np 
from scipy import stats

def load_data():
    if (session['file-type'] == 'csv'):
        return pd.read_csv(session['file'],  
                 index_col=0, parse_dates=True)
    elif(session['file-type'] == 'json'):
        return pd.read_json(session['file'], parse_dates=True)
    else:
        with open(session['file'], 'r') as f:
            return json_normalize(yaml.load(f))


def one_hot_encode(data):
    return get_dummies(data)

def drop_missing_data(df):
    df =  df[~df.isin([np.nan, np.inf, -np.inf]).any(1)]
    return df

def interpolate_missing_data(real, discrete):
    mode = discrete.mode().values.flatten()
    mean = real.mean().values.flatten()
    real_rep = list(zeros(len(real.columns)))
    dis_rep = list(zeros(len(real.columns)))
    j = 0
    for index in len(real_rep):
        real_rep[index] = mean[j]
        j += 1
    j = 0
    for index in len(dis_rep):
        dis_rep[index] = mode[j]
        j += 1
    real = real.fillna(Series(real_rep))
    discrete = discrete.fillna(Series(dis_rep))
    return real, discrete

def remove_outliers(real, discrete, output):
    df = pd.concat([real, discrete], axis=1)
    constrains = df.select_dtypes(exclude=['object']) \
        .apply(lambda x: np.abs(stats.zscore(x)) < 3) \
        .all(axis=1)
    df = pd.concat([df, output], axis=1)
    df.drop(df.index[~constrains], inplace=True)
    return df

def clean(df):
    df = drop_missing_data(df)
    output = df.iloc[:, -1]
    params = df.iloc[:, :-1]
    real = params.select_dtypes(exclude=['object', 'datetimetz'])
    discrete = params.select_dtypes(include=['object'])
    #real, discrete = interpolate_missing_data(real, discrete)
    # df = pd.concat([real, discrete, output], axis=1)
    df = remove_outliers(real, discrete, output)
    return df
