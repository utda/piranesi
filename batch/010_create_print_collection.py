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

prefix = "https://piranesi.dl.itc.u-tokyo.ac.jp"

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

map = {}

for key in data2:

    uuid = data2[key]["uuid"]

    metadata = data1[key]

    # print(metadata)

    constellation = ""

    for obj in metadata:
        label = obj["label"]
        value = obj["value"]


        if label == "volume":
            volume = value
        elif label == "plate":
            plate = value
        elif label == "series":
            series = value
        elif label == "series_JP":
            series_JP = value
        elif label == "constellation":
            constellation = value

    volume = int(volume)

    if volume not in map:
        map[volume] = {
            "label" : str(volume) + "巻 "+series + " " + series_JP,
            "manifests" : []
        }

    title = "第" + str(volume) + "巻 第" + str(plate) + "葉" + constellation

    map[volume]["manifests"].append({
        "@id": "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/"+uuid+"/manifest",
        "@type": "sc:Manifest",
        "label": title,
        "license": "http://creativecommons.org/publicdomain/zero/1.0/",
        "thumbnail": data2[key]["thumbnail"],
        "metadata" : metadata
        })

collections = []

with open('data/vols.json') as f:
    df = json.load(f)

print(df)

for obj in df:
    label = obj["label"]
    vols = obj["vols"]

    colls = []

    for vol in vols:
        print(vol)
        collection = {
            "label": map[vol]["label"],
            "manifests": map[vol]["manifests"]
        }
        colls.append(collection)

    collections.append({
        # "@context": "http://iiif.io/api/presentation/2/context.json",
        # "@id": "https://nakamura196.github.io/piranesi/print/iiif/vol.json",
        "label": label,
        # "@type": "sc:Collection",
        # "vhint": "use-thumb",
        "collections": colls # map[vol]
    })

collection = {
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": prefix + "/data/print/iiif/top.json",
  "label": "ピラネージ版画集",
  "@type": "sc:Collection",
  "vhint": "use-thumb",
  "collections": collections
}

with open("../static/data/print/iiif/top.json", 'w') as f:
    json.dump(collection, f, ensure_ascii=False, indent=4,
    sort_keys=True, separators=(',', ': '))