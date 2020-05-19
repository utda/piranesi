import pandas as pd
from rdflib import URIRef, BNode, Literal, Graph
from rdflib.namespace import RDF, RDFS, FOAF, XSD
from rdflib import Namespace
import numpy as np
import math
import sys
import argparse
import json
import os


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
                data[id].append({
                    "label": map[i],
                    "value": str(value)
                })

    return data


path = "data/photo3.xlsx"
data1 = read_excel(path)

manifests = []

for key in data1:

    label = key
    metadata = data1[key]
    for obj in metadata:
        label2 = obj["label"]
        value2 = obj["value"]
        if label2 == "Didascalia":
            label = value2

    photo_no = key

    prefix = "https://nakamura196.github.io/piranesi/photo/iiif/"+photo_no
    uri = prefix+"/manifest.json"

    canvas = prefix+"/canvas/1"

    img_prefix = "https://nakamura196.github.io/piranesi/photo"

    manifest = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@type": "sc:Manifest",
        "@id": uri,
        "label": label,
        "metadata": metadata,
        "viewingDirection": "left-to-right",
        "license": "http://creativecommons.org/publicdomain/zero/1.0/",
        "attribution": "東京大学 The University of Tokyo, JAPAN",
        "thumbnail": img_prefix+"/m/"+photo_no+".jpg",
        "sequences": [
            {
                "@type": "sc:Sequence",
                "viewingHint": "individuals",
                "canvases": [
                    {
                        "@id": canvas,
                        "@type": "sc:Canvas",
                        "label": "1",
                        "width": 3969,
                        "height": 3006,
                        "thumbnail": {
                            "@id": img_prefix+"/m/"+photo_no+".jpg",
                            "@type": "dctypes:Image",
                            "format": "image/jpeg"
                        },
                        "images": [
                            {
                                "@type": "oa:Annotation",
                                "motivation": "sc:painting",
                                "on": canvas,
                                "resource": {
                                    "@id": img_prefix+"/l/"+photo_no+".jpg",
                                    "@type": "dctypes:Image",
                                    "format": "image/jpeg",
                                    "width": 3969,
                                    "height": 3006
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }

    dir = "../docs/photo/iiif/"+photo_no
    os.makedirs(dir, exist_ok=True)

    manifests.append(
        {
        "@id": manifest["@id"],
        "@type": "sc:Manifest",
        "label": manifest["label"],
        "license": manifest["license"],
        "thumbnail": manifest["thumbnail"],
        "metadata" : manifest["metadata"]
        }
    )

    with open(dir+"/manifest.json", 'w') as f:
        json.dump(manifest, f, ensure_ascii=False, indent=4,
        sort_keys=True, separators=(',', ': '))


collection = {
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "https://nakamura196.github.io/piranesi/photo/iiif/top.json",
  "label": "ピラネージ関連写真",
  "@type": "sc:Collection",
  "manifests": manifests
}

with open("../docs/photo/iiif/top.json", 'w') as f:
    json.dump(collection, f, ensure_ascii=False, indent=4,
    sort_keys=True, separators=(',', ': '))

