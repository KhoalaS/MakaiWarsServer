const express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const https = require("https");
const morgan = require("morgan");

const options = {
    key: fs.readFileSync("./certs/makai_app.key"),
    cert: fs.readFileSync("./certs/makai_app.pem"),
};

const m_shop_items = require("./json/m_shop_items.json");
const m_shop_banners = require("./json/m_shop_banners.json");
const t_member_eqs = require("./json/t_member_eqs.json");
const m_shops = require("./json/m_shops.json");
const t_member_cards = require("./json/t_member_cards.json");
const rebirth_config = require("./json/rebirth_config.json");
const t_member_decks = require("./json/t_member_decks.json");
const m_home_backgrounds = require("./json/m_home_backgrounds.json");
const m_banners = require("./json/m_banners.json");
const m_events = require("./json/m_events.json");
const m_event_dungeons = require("./json/m_event_dungeons.json");
const t_member_event_stages = require("./json/t_member_event_stages.json");
const m_mugen_dungeons = require("./json/m_mugen_dungeons.json");
const group = require("./json/group.json");
const event_act_bonus = require("./json/event_act_bonus.json");
const items = require("./json/items.json");

const app = express();
app.use(morgan("combined"));
app.use(express.static("asg-ssl.akamaized.net"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 443;
const min = 1000000;
const max = 9999999;
var temp_member_id = "3055718";
var temp_name = "wjatdis";
var temp_uuid = "c40e40fc-4e4a-40d8-b114-b14e1212a71d";
const temp_token =
    "d348562d35bcdcda-4e0cf26e-426b3be4-bb060bf8-faba3b7bb540ad308777e8b9";
var temp_gc_count = 0;
const temp_state = 0;
const temp_units =
    "6004011,4008013,6003015,5014014,5020013,4010013,4006014,4012014,3031015,5083013";
var temp_update_type = 1;

function getTime() {
    var timestamp = Date.now();
    timestamp = timestamp.toString().substring(0, 10);
    return timestamp;
}

function getTomorrow(yes) {
    var x = new Date();
    if (yes == null) {
        x.setDate(new Date().getDate() + 1);
    }
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

app.post("/asg/api/signup", (req, res) => {
    var x_uuid = req.headers["x-uuid"];
    var x_pass =
        "fDgi7JomcyoyASkWkzacd0ZLKDOM7sMnLyyWUJ8uZtgMd1SQbz6RjMcThrcAhepE";
    res.status(200);
    res.set("x-password", x_pass);
    res.set("x-uuid", x_uuid);

    console.log("signup");

    res.end();
});

app.post("/asg/api/login", (req, res) => {
    var x_uuid = req.headers["x-uuid"];
    temp_uuid = x_uuid;
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", x_uuid);
    res.end();
});

//member_id creation is here
app.post("/asg/entryj/entry", (req, res) => {
    /*
    const member_id = (
        Math.floor(Math.random() * (max - min)) + min
    ).toString();
    */

    var member_id = temp_member_id;

    res.status(200);
    res.set("x-token", temp_token);

    var payload = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: member_id,
                    t_pre_member: [
                        {
                            state: 1,
                            t_member_id: member_id,
                            id: member_id,
                        },
                    ],
                },
            ],
            extra: {
                ad_tracking_request_enable: 1,
                ad_tracking_version_ios: "14.0",
            },
        },
        timestamp: getTime(),
    };
    res.send(payload);
});

//this is still using the temp member_id
app.post("/asg/tutoj/inputName", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var payload = JSON.parse(req.body["payload"]);
    var name = payload["name"];

    temp_name = name;

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_pre_member: [
                        {
                            id: temp_member_id,
                            t_member_id: temp_member_id,
                            name: name,
                            state: "1",
                            unit_id: null,
                            end_flg: "0",
                            denied_at: null,
                            gacha_cnt: "0",
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/tutoj/gachaNum", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            extra: {
                gacha_num: 10,
                banner: "banner_20210212",
                banner_text: "10連ガチャが何回でも引き直しができるよ",
                serif_intro: "神の力で新しい仲間を\n召喚します",
                serif_playing:
                    "欲しかった仲間は\n手に入ったかしら？\n何度でもやり直しが可能よ",
                serif_finish: "さあバトルへ突入よ",
            },
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.post("/asg/tutoj/gacha", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_pre_member: [
                        {
                            id: temp_member_id,
                            t_member_id: temp_member_id,
                            name: temp_name,
                            state: "6",
                            unit_id: temp_units,
                            end_flg: "0",
                            denied_at: null,
                            gacha_cnt: temp_gc_count,
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };
    temp_gc_count++;
    res.send(data);
});

app.post("/asg/tutoj/update/*", (req, res) => {
    var localPath = req.path;
    var state = localPath.split("/").pop();
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var units = null;
    if (state >= 7) {
        units = temp_units;
    }

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_pre_member: [
                        {
                            id: temp_member_id,
                            t_member_id: temp_member_id,
                            name: temp_name,
                            state: state,
                            unit_id: units,
                            end_flg: 0,
                            denied_at: null,
                            gacha_cnt: temp_gc_count,
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.get("/asg/tutoj/party", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            extra: {
                party: [1001011, "3043014", "5082012", "5081011", "5083013"],
            },
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.post("/asg/tutoj/finish", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_pre_member: [
                        {
                            id: temp_member_id,
                            t_member_id: temp_member_id,
                            name: temp_name,
                            state: 99,
                            unit_id: temp_units,
                            end_flg: "1",
                            denied_at: null,
                            gacha_cnt: temp_gc_count,
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.get("/asg/versionj/resouce", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            extra: {
                version: "02.01.42",
            },
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.post("/asg/masterj/update_list", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);
    var data = {};

    if (temp_update_type == 1) {
        data = {
            status_cd: 0,
            error_cd: 0,
            data: {
                extra: {
                    update_type: 1,
                    base_url: "https://asg-ssl.akamaized.net/downloads/Master",
                    file_names: [
                        {
                            id: "1",
                            name: "20210709000000/20210709000000_m_ai_personals.json",
                        },
                        {
                            id: "2",
                            name: "20210709000000/20210709000000_m_ais.json",
                        },
                        {
                            id: "3",
                            name: "20210709000000/20210709000000_m_cards.json",
                        },
                        {
                            id: "4",
                            name: "20210709000000/20210709000000_m_command_actives.json",
                        },
                        {
                            id: "5",
                            name: "20210709000000/20210709000000_m_command_passives.json",
                        },
                        {
                            id: "6",
                            name: "20210709000000/20210709000000_m_command_range_uis.json",
                        },
                        {
                            id: "7",
                            name: "20210709000000/20210709000000_m_command_ranges.json",
                        },
                        {
                            id: "9",
                            name: "20210709000000/20210709000000_m_eqs.json",
                        },
                        {
                            id: "10",
                            name: "20210709000000/20210709000000_m_event_stages.json",
                        },
                        {
                            id: "11",
                            name: "20210709000000/20210709000000_m_event_wave_maps.json",
                        },
                        {
                            id: "12",
                            name: "20210709000000/20210709000000_m_formation_lvs.json",
                        },
                        {
                            id: "13",
                            name: "20210709000000/20210709000000_m_formations.json",
                        },
                        {
                            id: "14",
                            name: "20210709000000/20210709000000_m_gimmicks.json",
                        },
                        {
                            id: "15",
                            name: "20210709000000/20210709000000_m_help_tips.json",
                        },
                        {
                            id: "16",
                            name: "20210709000000/20210709000000_m_items.json",
                        },
                        {
                            id: "17",
                            name: "20210709000000/20210709000000_m_levels.json",
                        },
                        {
                            id: "18",
                            name: "20210709000000/20210709000000_m_maseki_bases.json",
                        },
                        {
                            id: "19",
                            name: "20210709000000/20210709000000_m_monsters.json",
                        },
                        {
                            id: "20",
                            name: "20210709000000/20210709000000_m_quest_chapters.json",
                        },
                        {
                            id: "21",
                            name: "20210709000000/20210709000000_m_quest_episodes.json",
                        },
                        {
                            id: "22",
                            name: "20210709000000/20210709000000_m_quest_stage_missions.json",
                        },
                        {
                            id: "23",
                            name: "20210709000000/20210709000000_m_quest_stages.json",
                        },
                        {
                            id: "24",
                            name: "20210709000000/20210709000000_m_quest_wave_maps.json",
                        },
                        {
                            id: "25",
                            name: "20210709000000/20210709000000_m_phylons.json",
                        },
                        {
                            id: "27",
                            name: "20210709000000/20210709000000_m_card_categories.json",
                        },
                    ],
                    version: "20210709000000",
                },
            },
            timestamp: getTime(),
        };
        temp_update_type = 2;
    } else if (temp_update_type == 2) {
        data = {
            status_cd: 0,
            error_cd: 0,
            data: {
                extra: {
                    update_type: 2,
                    diff_master: [
                        "2",
                        "3",
                        "4",
                        "5",
                        "9",
                        "10",
                        "11",
                        "16",
                        "17",
                        "27",
                    ],
                    version: "20220418000000",
                },
            },
            timestamp: getTime(),
        };
        temp_update_type = 0;
    } else {
        data = {
            status_cd: 0,
            error_cd: 0,
            data: {
                extra: {
                    update_type: 0,
                },
            },
            timestamp: getTime(),
        };
    }
    res.send(data);
});

app.post("/asg/masterj/update_diff", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);
    res.set("Content-Type", "application/json");
    console.log("diff");

    var payload = JSON.parse(req.body["payload"]);
    var id = payload["id"];
    console.log(`update_diff_${id} requested`);

    var usersFilePath = path.join(__dirname, `update_diff_${id}.json`);
    console.log(usersFilePath);
    var readable = fs.createReadStream(usersFilePath);
    readable.pipe(res);
});

app.get(/\/asg\/prememberj\/index\/[0-9]{7}/, (req, res) => {
    var localPath = req.path;
    var id = localPath.split("/").pop();
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: id,
                    t_pre_member: [
                        {
                            id: id,
                            t_member_id: id,
                            name: temp_name,
                            state: "2",
                            unit_id: null,
                            end_flg: "0",
                            denied_at: null,
                            gacha_cnt: temp_gc_count,
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.get("/asg/settingj/asset_dl_setting", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            extra: {
                multi_dl_num: 5,
            },
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.get("/asg/settingj/data_fetch_setting", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            extra: {
                multi_num: 5,
            },
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.post("/asg/adj/setting_id", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var payload = JSON.parse(req.body["payload"]);
    var tracking_id = payload["id"];
    var tracking_status = payload["tracking_status"];

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: [],
        timestamp: getTime(),
    };
    res.send(data);
});

app.get("/asg/eqj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_eqs: t_member_eqs,
                    t_member_soul_eqs: [],
                    soul_eq_config: {
                        orb_id: 2403,
                        orb_nums: [
                            {
                                num: 1,
                                rare: 2,
                            },
                            {
                                num: 2,
                                rare: 3,
                            },
                            {
                                num: 3,
                                rare: 4,
                            },
                            {
                                num: 4,
                                rare: 5,
                            },
                        ],
                        book_id: 4201,
                        stone_ids: [
                            {
                                stone_id: 4301,
                                attribute: 1,
                            },
                            {
                                stone_id: 4302,
                                attribute: 2,
                            },
                            {
                                stone_id: 4303,
                                attribute: 3,
                            },
                            {
                                stone_id: 4304,
                                attribute: 4,
                            },
                            {
                                stone_id: 4305,
                                attribute: 5,
                            },
                        ],
                        stone_nums: [
                            {
                                num: 50,
                                rare: 2,
                            },
                            {
                                num: 100,
                                rare: 3,
                            },
                        ],
                    },
                },
            ],
            extra: {
                eq_add_max: 1500,
            },
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/accountj/check_linked", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_accounts: {
                        t_member_id: temp_member_id,
                        linked: 0,
                    },
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data)
});

app.get("/asg/shopj/items", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    m_shop_banners: m_shop_banners,
                    m_shop_items: m_shop_items,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/shopj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    m_shops: m_shops,
                    m_shop_banners: m_shop_banners,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/itemj/index/", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_items: [
                        {
                            item_id: "1101",
                            item_type: "11",
                            item_num: "10000",
                        },
                        {
                            item_id: "1201",
                            item_type: "12",
                            item_num: "10000",
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data);
});

app.get("/asg/memberj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_cards: t_member_cards,
                    t_member_card_rebirth: [],
                    rebirth_config: rebirth_config,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/mycardj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_cards: t_member_cards,
                    t_member_card_rebirth: [],
                    rebirth_config: rebirth_config,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/deckj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_deck_eqs: [],
                    t_member_decks: t_member_decks,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/formationj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_formations: [
                        {
                            id: "325233",
                            m_formation_id: "1",
                            lv: "1",
                        },
                    ],
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/homej/event_bg", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    m_home_backgrounds: m_home_backgrounds,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

//t_member_notice contains a lot of per account data
app.get("/asg/homej/pre_load", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_member_item_activations: [],
                    m_banners: m_banners,
                    t_member_notice: {
                        info_cnt: 0,
                        present_cnt: "15",
                        mission_cnt: 2,
                        mission_open: 0,
                        exploration_base: "",
                        free_gacha: 1,
                        boss_atk_num: 2,
                        follow_like: 0,
                        sp_mission_cnt: 0,
                        sp_mission_open: 1,
                        decisive_badge: 0,
                        decisive_open: 0,
                        decisive_yell: 0,
                        charge_open: 0,
                        charge_cnt: 0,
                    },
                    auto_sale_config: {
                        common: ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
                        rare: ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
                        legend: ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
                    },
                    world_boss_deck: [],
                },
            ],
            extra: {
                m_world_boss_id: 99999999990,
                arena_open: 1,
                arena_msg: "アリーナ非開催",
                arena_result: 0,
                worldboss_in_session: 1,
                ad_tracking_request_enable: 1,
                ad_tracking_version_ios: "14.0",
            },
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/questj/index", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    m_events: m_events,
                    m_event_dungeons: m_event_dungeons,
                    t_member_event_stages: t_member_event_stages,
                    event_act_bonus: [
                        {
                            id: "5",
                            type: 2,
                            rate: 50,
                            passport_flg: "0",
                            passport2_flg: "0",
                            date_from: "2022-02-28 15:00:00",
                            date_to: "9999-01-01 00:00:00",
                        },
                        {
                            id: "6",
                            type: 1,
                            rate: 50,
                            passport_flg: "0",
                            passport2_flg: "0",
                            date_from: "2022-02-28 15:00:00",
                            date_to: "9999-01-01 00:00:00",
                        },
                    ],
                    playable_badge: {
                        enabled: 1,
                        dungeon_id: [11, 12, 15, 16, 17, 18, 19, 22, 61, 71],
                    },
                    group: [
                        {
                            id: "1",
                            title: "属性強化の間",
                            m_events_id: "15,16,17,18,19",
                            group_flg: "0",
                            tab: "2",
                            sort: "26",
                            banner: "ui/quest/textures/banner/eventgroup/episode26",
                            date_from: "2000-01-01 00:00:00",
                            date_to: "9999-01-01 00:00:00",
                            youbi: "1,2,3,4,5,6,7",
                            num: "10",
                            num_recovery: "10",
                            progress_check: "0",
                        },
                        {
                            id: "2",
                            title: "転生の間",
                            m_events_id: "31,32,33,34,35",
                            group_flg: "1",
                            tab: "2",
                            sort: "36",
                            banner: "ui/quest/textures/banner/eventgroup/episode36",
                            date_from: "2022-09-30 00:00:00",
                            date_to: "2022-09-30 23:59:59",
                            youbi: "1,2,3,4,5,6,7",
                            num: "20",
                            num_recovery: "10",
                            progress_check: "0",
                        },
                        {
                            id: "3",
                            title: "魔装の間",
                            m_events_id: "41,42,43,44,45",
                            group_flg: "0",
                            tab: "2",
                            sort: "46",
                            banner: "ui/quest/textures/banner/eventgroup/episode46",
                            date_from: "2000-01-01 00:00:00",
                            date_to: "9999-01-01 00:00:00",
                            youbi: "1,2,3,4,5,6,7",
                            num: "20",
                            num_recovery: "10",
                            progress_check: "0",
                        },
                        {
                            id: "4",
                            title: "限界突破の間",
                            m_events_id: "51,52,53,54,55",
                            group_flg: "0",
                            tab: "2",
                            sort: "56",
                            banner: "ui/quest/textures/banner/eventgroup/episode56",
                            date_from: "2000-01-01 00:00:00",
                            date_to: "9999-01-01 00:00:00",
                            youbi: "1,2,3,4,5,6,7",
                            num: "10",
                            num_recovery: "5",
                            progress_check: "0",
                        },
                        {
                            id: "5",
                            title: "アサギ界編",
                            m_events_id: "20001,20002,20003,20004,20005,20006",
                            group_flg: "0",
                            tab: "4",
                            sort: "100",
                            banner: "ui/quest/textures/banner/eventgroup/episode20000",
                            date_from: "2000-01-01 00:00:00",
                            date_to: "9999-01-01 00:00:00",
                            youbi: "0",
                            num: "0",
                            num_recovery: "0",
                            progress_check: "1",
                        },
                        {
                            id: "6",
                            title: "魔音編",
                            m_events_id: "30001,30002,30003,30004,30005,30006",
                            group_flg: "0",
                            tab: "4",
                            sort: "101",
                            banner: "ui/quest/textures/banner/eventgroup/episode30000",
                            date_from: "2000-01-01 00:00:00",
                            date_to: "9999-01-01 00:00:00",
                            youbi: "0",
                            num: "0",
                            num_recovery: "0",
                            progress_check: "1",
                        },
                        {
                            id: "7",
                            title: "勇者の鏡編",
                            m_events_id: "6066,6075,6076,6080,6082",
                            group_flg: "0",
                            tab: "4",
                            sort: "102",
                            banner: "ui/quest/textures/banner/eventgroup/episode40000",
                            date_from: "2000-01-01 00:00:00",
                            date_to: "9999-01-01 00:00:00",
                            youbi: "0",
                            num: "0",
                            num_recovery: "0",
                            progress_check: "1",
                        },
                    ],
                    bonus_story: [
                        {
                            story_no: "2000615",
                            dungeon_id: "20006",
                            clear_stage_id: "2000629",
                            btn_title: "ENDING",
                            btn_align: 1,
                            font: 40,
                        },
                        {
                            story_no: "3000615",
                            dungeon_id: "30006",
                            clear_stage_id: "3000621",
                            btn_title: "ENDING",
                            btn_align: 1,
                            font: 40,
                        },
                    ],
                    m_mugen_dungeons: m_mugen_dungeons,
                },
            ],
        },
        timestamp: getTime(),
    };

    res.send(data);
});

app.get("/asg/questj/sp", (req, res) => {
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    m_events: m_events,
                    m_event_dungeons: m_event_dungeons,
                    t_member_event_stages: t_member_event_stages,
                    event_act_bonus: event_act_bonus,
                    playable_badge: {
                        enabled: 1,
                        dungeon_id: [11, 12, 15, 16, 17, 18, 19, 22, 61, 71],
                    },
                    group: group,
                    bonus_story: [
                        {
                            story_no: "2000615",
                            dungeon_id: "20006",
                            clear_stage_id: "2000629",
                            btn_title: "ENDING",
                            btn_align: 1,
                            font: 40,
                        },
                        {
                            story_no: "3000615",
                            dungeon_id: "30006",
                            clear_stage_id: "3000621",
                            btn_title: "ENDING",
                            btn_align: 1,
                            font: 40,
                        },
                    ],
                    m_mugen_dungeons: m_mugen_dungeons,
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data);
});

//again lot of account data in json
app.get(/\/asg\/memberj\/index\/[0-9]{7}/, (req, res) => {
    var localPath = req.path;
    var id = localPath.split("/").pop();
    res.status(200);
    res.set("x-token", temp_token);
    res.set("x-uuid", temp_uuid);

    var data = {
        status_cd: 0,
        error_cd: 0,
        data: {
            replace: [
                {
                    t_member_id: temp_member_id,
                    t_members: {
                        id: temp_member_id,
                        os_type: "2",
                        name: temp_name,
                        lv: "1",
                        exp: "0",
                        exp_sum: "0",
                        act_max_date: getTomorrow(),
                        act_max: "20",
                        act_overflow: "0",
                        act_push_suspend: "0",
                        friend_now: "0",
                        friend_max: "100",
                        friend_num: "0",
                        friend_num_followed: "0",
                        card_num: "11",
                        eq_max: "250",
                        eq_num: "15",
                        m_quest_stage_id: "10110111",
                        t_member_card_id: "6568404",
                        m_card_id: "5083013",
                        t_member_card_lv: "1",
                        deck_no: "1",
                        bp_max: "10",
                        bp_max_date: getTomorrow(),
                        last_login_date: "0000-00-00 00:00:00",
                        last_login_present_date: "0000-00-00",
                        continue_login_count: "0",
                        login_sheet: "1",
                        login_days: "0",
                        info_conf_date: getTomorrow(),
                        mission_beginner_clear_flg: "0",
                        identity: "",
                        denied_at: null,
                        info_date: getTomorrow(),
                        admin_flg: "0",
                        created: getTomorrow(),
                        modified: getTomorrow(),
                    },
                },
            ],
        },
        timestamp: getTime(),
    };
    res.send(data);
});

https.createServer(options, app).listen(port);
