function getTomorrow() {
    var x = new Date();
    x.setDate(new Date().getDate() + 1);
    var sec = x.getSeconds();
    if (sec.toString().length < 2) {
        sec += "0";
    }
    var ret =
        x.toISOString().substring(0, 10) +
        " " +
        x.getHours() +
        ":" +
        x.getMinutes() +
        ":" +
        sec;
    return ret;
}
