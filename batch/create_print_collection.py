import pandas as pd
from rdflib import URIRef, BNode, Literal, Graph
from rdflib.namespace import RDF, RDFS, FOAF, XSD
from rdflib import Namespace
import numpy as np
import math
import sys
import argparse
import json
import html


def read_excel(path):
    df = pd.read_excel(path, sheet_name=0, header=None, index_col=None)

    r_count = len(df.index)
    c_count = len(df.columns)

    map = {}

    for i in range(0, c_count):
        label = df.iloc[0, i]
        map[i] = label

    data = {}

    for j in range(1, r_count):
        id = df.iloc[j, 0]
        data[id] = []

        for i in map:
            value = df.iloc[j, i]

            if not pd.isnull(value) and value != 0:
                data[int(id)].append({
                    "label": map[i],
                    "value": html.unescape(str(value))
                })

    return data


def read_excel2(path):
    df = pd.read_excel(path, sheet_name=0, header=None, index_col=None)

    r_count = len(df.index)

    map = {}

    for j in range(2, r_count):

        value = df.iloc[j, 25]
        if not pd.isnull(value) and value != 0:
            uuid = df.iloc[j, 56]

            map[int(value)] = {
                "uuid": uuid,
                "thumbnail":  df.iloc[j, 60]
            }

    return map


path = "data/sougouwebcp.xlsx"
data1 = read_excel(path)

# print(data1)
data2 = read_excel2("data/data.xlsx")

manifests = []

for key in data2:

    uuid = data2[key]["uuid"]

    manifests.append(
        {
        "@id": "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/"+uuid+"/manifest",
        "@type": "sc:Manifest",
        "label": str(key),
        "license": "http://creativecommons.org/publicdomain/zero/1.0/",
        "thumbnail": data2[key]["thumbnail"],
        "metadata" : data1[key]
        }
    )

collection = {
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "https://nakamura196.github.io/piranesi/print/iiif/top.json",
  "label": "ピラネージ",
  "@type": "sc:Collection",
  "manifests": manifests
}

with open("../docs/print/iiif/top.json", 'w') as f:
    json.dump(collection, f, ensure_ascii=False, indent=4,
    sort_keys=True, separators=(',', ': '))