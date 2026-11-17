# Script per calcolare la somma delle superfici dei comuni di ogni provincia e la superficie totale della regione

import json
import os

cartella = os.path.dirname(os.path.abspath(__file__))

superficie_regione = 0
nome_regione = ""

for nome_file in sorted(os.listdir(cartella)):
    if nome_file.endswith(".json"):
        percorso_json = os.path.join(cartella, nome_file)
        
        with open(percorso_json, encoding="utf-8") as f:
            comuni = json.load(f)

        somma_provincia = 0
        for comune in comuni:
            somma_provincia += comune["superficie"]

        nome_provincia = comuni[0]["provincia"]
        nome_regione = comuni[0]["regione"]

        print(f"superficie {nome_provincia}: {somma_provincia:.4f}")
        superficie_regione += somma_provincia

print(f"superficie {nome_regione}: {superficie_regione:.4f}")