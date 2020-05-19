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

count = 0

map = {}

for manifest in manifests:
    print(manifest["@id"])

    count += 1

    manifest_data = requests.get(manifest["@id"]).json()

    no = ""

    metadata = manifest_data["metadata"]

    for obj in metadata:
        if obj["label"] == "Kamei Collection Number／亀井文庫番号":
            no = obj["value"]

    id = manifest_data["sequences"][0]["canvases"][0]["thumbnail"]["service"]["@id"].split("/")[-1].split(".")[0]
    print(id)
    print(no)

    map[no] = id

    

for count in map:
    print(count, map[count])

