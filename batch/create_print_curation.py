import pandas as pd
from rdflib import URIRef, BNode, Literal, Graph
from rdflib.namespace import RDF, RDFS, FOAF, XSD
from rdflib import Namespace
import numpy as np
import math
import sys
import argparse
import json


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
                    "value": value
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


print(data2)

selections = []

for key in data2:
    uuid = data2[key]["uuid"]
    selections.append(
    {
      "@id": "http://mp.ex.nii.ac.jp/api/curation/json/2bd9f4cc-c5ed-4521-a67a-7ed931967eba/range1",
      "@type": "sc:Range",
      "label": "Manual curation by IIIF Curation Viewer",
      "within": {
        "@id": "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/"+uuid+"/manifest",
        "@type": "sc:Manifest",
        "label": str(key)
      },
      "members": [
        {
          "@id": "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/"+uuid+"/canvas/p1",
          "@type": "sc:Canvas",
          "label": str(key),
          "metadata": data1[key],
          "thumbnail": data2[key]["thumbnail"],
          "related" : "https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/piranesi/document/"+uuid
        }
        ]
    })

curation = {
  "@context": [
    "http://iiif.io/api/presentation/2/context.json",
    "http://codh.rois.ac.jp/iiif/curation/1/context.json"
  ],
  "@id": "http://mp.ex.nii.ac.jp/api/curation/json/2bd9f4cc-c5ed-4521-a67a-7ed931967eba",
  "@type": "cr:Curation",
  "label": "Piranesi",
  "selections": selections
}

with open("data/curation.json", 'w') as f:
    json.dump(curation, f, ensure_ascii=False,
              sort_keys=True, separators=(',', ': '))

'''
json_path = path+'.json'

f2 = open(json_path, "wb")
f2.write(g.serialize(format='json-ld'))
f2.close()

with open(json_path) as f:
    df = json.load(f)


'''
