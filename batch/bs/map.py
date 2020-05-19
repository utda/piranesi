import requests
from bs4 import BeautifulSoup
import urllib.parse
import json

target_url = 'https://diyhistory.org/public/localhost/FMPro@-db=sougouwebcp.fp5&-format=mapsearch.html&-FindAll.html'
r = requests.get(target_url)         #requestsを使って、webから取得
soup = BeautifulSoup(r.text, 'lxml') #要素を抽出

data = {}

for a in soup.find_all('a'):
    # print(a)
    if a.get("href") and "Edificio_IL=" in a.get("href"):
        # print(a.get("href"))
        
        param = a.get("href").split("Edificio_IL=")[1].split("&")[0]

        # print(param)

        param = urllib.parse.quote(param)

        url = "https://diyhistory.org/public/localhost/FMPro@-db=sougouwebcp.fp5&-op=eq&Edificio_IL="+param+"&-find=&-format=title.html"

        # print(url)

        r = requests.get(url)         #requestsを使って、webから取得
        soup = BeautifulSoup(r.text, 'lxml') #要素を抽出

        # print(param)

        # print(soup)


        try:

            h4 = soup.find("h4")

            text = h4.get_text()

            i = h4.find("i").text.strip()

            # print(i)

            text = text.replace(i, "").strip()

            # print(text)

            param2 = urllib.parse.unquote(param)

            # print(param2)

            data[param2] = {
                "i" : i,
                "label" : text
            }
        
        except:
            print("*", param)

        # print("================")

# print(data)

with open("map.json", 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=4,
    separators=(',', ': '))