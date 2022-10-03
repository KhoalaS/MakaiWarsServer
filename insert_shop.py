import json
import sqlite3
import os

file = open("edit.json")
data = json.load(file)
attr = []
for key in data:
    attr.append(key)

#attr_string = ",".join(attr)
#print(attr_string)

    
file.close()

files = os.listdir("shop/")


con = sqlite3.connect("main.db")
cur = con.cursor()
rows = []

for f in files:
    if ".json" in f:
        file = open("shop/"+f)
        data = json.load(file)
        items = data["data"]["extra"]["m_shop_items"]
        for item in items:
            vals = []
            for a in attr:
                if a == "m_item_id_shop" or a == "m_item_num_shop":
                    if len(item[a]) > 1:
                        cat = ",".join(item[a])
                        vals.append(cat)
                    else:
                        cat = item[a][0]
                        vals.append(cat)
                else:
                    vals.append(item[a])
            t_vals = tuple(vals)
            rows.append(t_vals)
            
x = "?, "*len(attr)
x = "(" + x[0:len(x)-2] + ")"

cur.executemany("INSERT INTO shop_items VALUES" + x, rows)
con.commit()
                   



