import pandas as pd
from rdflib import URIRef, BNode, Literal, Graph
from rdflib.namespace import RDF, RDFS, FOAF, XSD
from rdflib import Namespace
import numpy as np
import math
import sys
import argparse
import json
import requests

path = "data/check_iizuka.xlsx"
df = pd.read_excel(path, sheet_name=0, header=None, index_col=None)

r_count = len(df.index)
c_count = len(df.columns)

data = {}

fields = []

for j in range(1, r_count):
    id = df.iloc[j, 0].split("/")[-1]
    data[id] = {}

    for i in range(1, 4):
        value = df.iloc[j, i]

        if pd.isnull(value):
            continue
        
        values = value[1:].split("】")

        field = values[0]
        v = values[1]

        data[id][field] = v

        if field not in fields:
            fields.append(field)


with open('data/top2.json') as f:
    df = json.load(f)

manifests = df["manifests"]

fid_map = {}

for manifest in manifests:
    uuid = manifest["@id"].split("/")[-2]

    metadata = manifest["metadata"]

    fid = ""
    for obj in metadata:
        label = obj["label"]
        value = obj["value"]

        if label == "file_no":
            fid = value

    fid_map[fid] = uuid

rows = []

row = ["bibo:identifier"]

labels = {
    "title" : "dcterms:title",
    "inscription2" : "pi:inscription2",
    "inscription1" : "pi:inscription1",
    "series" : "pi:series",
    "title_eu" : "pi:title_eu",
    "WE_title" : "pi:we_title",
    "HF_desc" : "pi:hf_desc",
    "collezione" : "pi:collezione",
    "sign_ecc" : "pi:sign_ecc"
}


for field in fields:
    row.append(labels[field])

rows.append(row)


for fid in data:
    uuid = fid_map[fid]

    row = [uuid]

    map = data[fid]

    for field in fields:
        value = ""
        if field in map:
            value = map[field]

        row.append(value)

    rows.append(row)

df = pd.DataFrame(rows)

df.to_csv('data/omeka.csv',index=False, header=False)

'''

collection = requests.get("https://nakamura196.github.io/piranesi/print/iiif/top.json").json()
manifests = collection["manifests"]

df = []
df.append(["URL"])

for manifest in manifests:

    no = ""

    metadata = manifest["metadata"]

    check = {}

    for obj in metadata:
        label = obj["label"]
        value = obj["value"]

        if "�" in value and label != "検索フィールド":
            check[label] = value


        if label == "file_no":
            no = value

    if len(check.keys()) > 0:

        print(no, check)

        row = []
        row.append("https://piranesi.dl.itc.u-tokyo.ac.jp/item/"+no)

        for key in check:
            row.append("【"+key+"】"+check[key])

        df.append(row)

df = pd.DataFrame(df)

df.to_excel('data/check.xlsx',index=False, header=False)

'''