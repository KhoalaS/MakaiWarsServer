app.get("", (req,res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {}

    res.send(data)
})