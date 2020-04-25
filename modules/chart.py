from .utils import load_data
import pandas as import pd 



def getChart(row, ext, path):
    df = load_data(path, ext)
    data = df[row]
    