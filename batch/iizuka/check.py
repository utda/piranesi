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
