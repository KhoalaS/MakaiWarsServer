const path = require("path")
function getTomorrow() {
    var x = new Date();
    x.setDate(new Date().getDate() + 1);
    var sec = x.getSeconds();
    var min = x.getMinutes()
    var hour = x.getHours()
    if (sec.toString().length < 2) {
        sec = "0" + sec;
    }
    if (min.toString().length < 2) {
        min = "0" + min;
    }
    if (hour.toString().length < 2) {
        hour = "0" + hour;
    }
    var ret =
        x.toISOString().substring(0, 10) +
        " " +
        hour +
        ":" +
        min +
        ":" +
        sec;
    return ret;

}

console.log(getTomorrow())
var usersFilePath = path.join(__dirname, `/shop/update_diff_1.json`);
console.log(usersFilePath)

var x = {
    card: "yellow,123"
}

if(x["card"].includes(",")){
    var y = x["card"].split(",")
    console.log(y)
    x["card"] = y
}

console.log(x)