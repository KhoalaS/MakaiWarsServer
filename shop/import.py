import os

import_string = ""

arr = os.listdir()
for file in arr:
    if ".json" in file:
        name = (file.split("."))[0]
        import_string += "const {} = require(\"./shop/{}\")\n".format(name,file)

print(import_string)
