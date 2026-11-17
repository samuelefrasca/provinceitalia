# AGGIUNGE LA SUPERFICIE AI JSON ESISTENTI
# Il csv con tutti i comuni deve trovarsi nella stessa cartella dello script
# Link al csv: https://situas.istat.it/web/#/home/piu-consultati?id=74&dateFrom=2026-11-17

import csv
import json
import os

CSV_SUPERFICI = os.path.join(os.path.dirname(os.path.abspath(__file__)), "superfici.csv")  # cambia il nome del file
CARTELLA_DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")


def leggi_csv(percorso):
    # i csv ISTAT a volte sono in cp1252 invece che utf-8
    for encoding in ("utf-8-sig", "cp1252"):
        try:
            with open(percorso, mode="r", encoding=encoding, newline="") as f:
                return list(csv.DictReader(f, delimiter=";"))
        except UnicodeDecodeError:
            continue
    raise ValueError("Encoding del CSV non riconosciuto")


# codice comune -> superficie
superfici = {}
for riga in leggi_csv(CSV_SUPERFICI):
    valore = riga["Superficie (Kmq)"].strip()
    if not valore:
        continue
    codice = riga["Codice Comune (alfanumerico)"].strip().zfill(6)
    superfici[codice] = float(valore.replace(".", "").replace(",", "."))

aggiornati = 0
mancanti = []

for radice, _, files in os.walk(CARTELLA_DATA):
    for nome in files:
        if not nome.endswith(".json"):
            continue

        percorso = os.path.join(radice, nome)
        with open(percorso, mode="r", encoding="utf-8") as f:
            comuni = json.load(f)

        # salta eventuali json che non sono liste di comuni
        if not isinstance(comuni, list) or not all("codice_istat" in c for c in comuni):
            continue

        for comune in comuni:
            codice = str(comune["codice_istat"]).zfill(6)
            if codice in superfici:
                comune["superficie"] = superfici[codice]
                aggiornati += 1
            else:
                mancanti.append(f'{comune["comune"]} ({codice})')

        with open(percorso, mode="w", encoding="utf-8") as f:
            json.dump(comuni, f, indent=2, ensure_ascii=False)

print(f"Comuni aggiornati: {aggiornati}")
if mancanti:
    print(f"Comuni senza superficie ({len(mancanti)}):")
    for m in mancanti:
        print(f"  - {m}")