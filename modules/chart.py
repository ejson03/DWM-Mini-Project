import random
from pandas import json_normalize
import json


def randomColor(labels):
    colors = []
    for item in labels:
        colors.append("%06x" % random.randint(0, 0xFFFFFF))
    return colors

    

def getChart(data):
    csv = json_normalize(data[0])
    x = data[1]
    y = data[2]
    record, labels = list(csv[x]) , list(set(csv[y]))
    xtype, ytype = csv.dtypes[x], csv.dtypes[y]
    colors = randomColor(labels)

    return {
        'record' : record,
        'colors' : colors,
        'labels' : labels
    }
    