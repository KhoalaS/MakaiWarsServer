import json
import sqlite3


file = open("edit.json")
data = json.load(file)
attr = []
for key in data:
    attr.append(key)

print(",".join(attr))
    
file.close()

file = open("asg-ssl.akamaized.net/downloads/Master/20210709000000/20210709000000_m_items.json")
con = sqlite3.connect("main.db")
cur = con.cursor()
rows = []

x = "?, "*len(attr)
x = "(" + x[0:len(x)-2] + ")"

data = json.load(file)
master = data["master"]

for card in master:
    vals = []
    for a in attr:
        vals.append(card[a])
    t_vals = tuple(vals)
    rows.append(t_vals)

cur.executemany("INSERT INTO items VALUES" + x, rows)
con.commit()
