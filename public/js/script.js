var debugMode = false;

var lobbyCode = "";
var round = 0;
var players = {
    names: ["", ""],
    scores: [0, 0],
    ready: [false, false],
    answers: ["", ""]
}
let countries = [];
const normcountries = {
    "ad": "Andorra",
    "ae": "United Arab Emirates",
    "af": "Afghanistan",
    "ag": "Antigua and Barbuda",
    "ai": "Anguilla",
    "al": "Albania",
    "am": "Armenia",
    "ao": "Angola",
    "aq": "Antarctica",
    "ar": "Argentina",
    "as": "American Samoa",
    "at": "Austria",
    "au": "Australia",
    "aw": "Aruba",
    "ax": "Åland Islands",
    "az": "Azerbaijan",
    "ba": "Bosnia and Herzegovina",
    "bb": "Barbados",
    "bd": "Bangladesh",
    "be": "Belgium",
    "bf": "Burkina Faso",
    "bg": "Bulgaria",
    "bh": "Bahrain",
    "bi": "Burundi",
    "bj": "Benin",
    "bl": "Saint Barthélemy",
    "bm": "Bermuda",
    "bn": "Brunei",
    "bo": "Bolivia",
    "bq": "Caribbean Netherlands",
    "br": "Brazil",
    "bs": "Bahamas",
    "bt": "Bhutan",
    "bv": "Bouvet Island",
    "bw": "Botswana",
    "by": "Belarus",
    "bz": "Belize",
    "ca": "Canada",
    "cc": "Cocos (Keeling) Islands",
    "cd": "DR Congo",
    "cf": "Central African Republic",
    "cg": "Republic of the Congo",
    "ch": "Switzerland",
    "ci": "Côte d'Ivoire (Ivory Coast)",
    "ck": "Cook Islands",
    "cl": "Chile",
    "cm": "Cameroon",
    "cn": "China",
    "co": "Colombia",
    "cr": "Costa Rica",
    "cu": "Cuba",
    "cv": "Cape Verde",
    "cw": "Curaçao",
    "cx": "Christmas Island",
    "cy": "Cyprus",
    "cz": "Czechia",
    "de": "Germany",
    "dj": "Djibouti",
    "dk": "Denmark",
    "dm": "Dominica",
    "do": "Dominican Republic",
    "dz": "Algeria",
    "ec": "Ecuador",
    "ee": "Estonia",
    "eg": "Egypt",
    "eh": "Western Sahara",
    "er": "Eritrea",
    "es": "Spain",
    "et": "Ethiopia",
    "eu": "European Union",
    "fi": "Finland",
    "fj": "Fiji",
    "fk": "Falkland Islands",
    "fm": "Micronesia",
    "fo": "Faroe Islands",
    "fr": "France",
    "ga": "Gabon",
    "gb": "United Kingdom",
    "gb-eng": "England",
    "gb-nir": "Northern Ireland",
    "gb-sct": "Scotland",
    "gb-wls": "Wales",
    "gd": "Grenada",
    "ge": "Georgia",
    "gf": "French Guiana",
    "gg": "Guernsey",
    "gh": "Ghana",
    "gi": "Gibraltar",
    "gl": "Greenland",
    "gm": "Gambia",
    "gn": "Guinea",
    "gp": "Guadeloupe",
    "gq": "Equatorial Guinea",
    "gr": "Greece",
    "gs": "South Georgia",
    "gt": "Guatemala",
    "gu": "Guam",
    "gw": "Guinea-Bissau",
    "gy": "Guyana",
    "hk": "Hong Kong",
    "hm": "Heard Island and McDonald Islands",
    "hn": "Honduras",
    "hr": "Croatia",
    "ht": "Haiti",
    "hu": "Hungary",
    "id": "Indonesia",
    "ie": "Ireland",
    "il": "Israel",
    "im": "Isle of Man",
    "in": "India",
    "io": "British Indian Ocean Territory",
    "iq": "Iraq",
    "ir": "Iran",
    "is": "Iceland",
    "it": "Italy",
    "je": "Jersey",
    "jm": "Jamaica",
    "jo": "Jordan",
    "jp": "Japan",
    "ke": "Kenya",
    "kg": "Kyrgyzstan",
    "kh": "Cambodia",
    "ki": "Kiribati",
    "km": "Comoros",
    "kn": "Saint Kitts and Nevis",
    "kp": "North Korea",
    "kr": "South Korea",
    "kw": "Kuwait",
    "ky": "Cayman Islands",
    "kz": "Kazakhstan",
    "la": "Laos",
    "lb": "Lebanon",
    "lc": "Saint Lucia",
    "li": "Liechtenstein",
    "lk": "Sri Lanka",
    "lr": "Liberia",
    "ls": "Lesotho",
    "lt": "Lithuania",
    "lu": "Luxembourg",
    "lv": "Latvia",
    "ly": "Libya",
    "ma": "Morocco",
    "mc": "Monaco",
    "md": "Moldova",
    "me": "Montenegro",
    "mf": "Saint Martin",
    "mg": "Madagascar",
    "mh": "Marshall Islands",
    "mk": "North Macedonia",
    "ml": "Mali",
    "mm": "Myanmar",
    "mn": "Mongolia",
    "mo": "Macau",
    "mp": "Northern Mariana Islands",
    "mq": "Martinique",
    "mr": "Mauritania",
    "ms": "Montserrat",
    "mt": "Malta",
    "mu": "Mauritius",
    "mv": "Maldives",
    "mw": "Malawi",
    "mx": "Mexico",
    "my": "Malaysia",
    "mz": "Mozambique",
    "na": "Namibia",
    "nc": "New Caledonia",
    "ne": "Niger",
    "nf": "Norfolk Island",
    "ng": "Nigeria",
    "ni": "Nicaragua",
    "nl": "Netherlands",
    "no": "Norway",
    "np": "Nepal",
    "nr": "Nauru",
    "nu": "Niue",
    "nz": "New Zealand",
    "om": "Oman",
    "pa": "Panama",
    "pe": "Peru",
    "pf": "French Polynesia",
    "pg": "Papua New Guinea",
    "ph": "Philippines",
    "pk": "Pakistan",
    "pl": "Poland",
    "pm": "Saint Pierre and Miquelon",
    "pn": "Pitcairn Islands",
    "pr": "Puerto Rico",
    "ps": "Palestine",
    "pt": "Portugal",
    "pw": "Palau",
    "py": "Paraguay",
    "qa": "Qatar",
    "re": "Réunion",
    "ro": "Romania",
    "rs": "Serbia",
    "ru": "Russia",
    "rw": "Rwanda",
    "sa": "Saudi Arabia",
    "sb": "Solomon Islands",
    "sc": "Seychelles",
    "sd": "Sudan",
    "se": "Sweden",
    "sg": "Singapore",
    "sh": "Saint Helena, Ascension and Tristan da Cunha",
    "si": "Slovenia",
    "sj": "Svalbard and Jan Mayen",
    "sk": "Slovakia",
    "sl": "Sierra Leone",
    "sm": "San Marino",
    "sn": "Senegal",
    "so": "Somalia",
    "sr": "Suriname",
    "ss": "South Sudan",
    "st": "São Tomé and Príncipe",
    "sv": "El Salvador",
    "sx": "Sint Maarten",
    "sy": "Syria",
    "sz": "Eswatini (Swaziland)",
    "tc": "Turks and Caicos Islands",
    "td": "Chad",
    "tf": "French Southern and Antarctic Lands",
    "tg": "Togo",
    "th": "Thailand",
    "tj": "Tajikistan",
    "tk": "Tokelau",
    "tl": "Timor-Leste",
    "tm": "Turkmenistan",
    "tn": "Tunisia",
    "to": "Tonga",
    "tr": "Turkey",
    "tt": "Trinidad and Tobago",
    "tv": "Tuvalu",
    "tw": "Taiwan",
    "tz": "Tanzania",
    "ua": "Ukraine",
    "ug": "Uganda",
    "us": "United States",
    "uy": "Uruguay",
    "uz": "Uzbekistan",
    "va": "Vatican City (Holy See)",
    "vc": "Saint Vincent and the Grenadines",
    "ve": "Venezuela",
    "vg": "British Virgin Islands",
    "vi": "United States Virgin Islands",
    "vn": "Vietnam",
    "vu": "Vanuatu",
    "wf": "Wallis and Futuna",
    "ws": "Samoa",
    "xk": "Kosovo",
    "ye": "Yemen",
    "yt": "Mayotte",
    "za": "South Africa",
    "zm": "Zambia",
    "zw": "Zimbabwe"
};

var host = false;
var flag;

async function joinLobby() {
    data = await connectToLobby();
    if(data == null) return;
    
    players.names[0] = data.players[0];
    document.getElementById("loading").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("lobbyIdSpan").innerHTML = lobbyCode.toString();
    document.getElementById("p1").innerHTML = players.names[1];
    document.getElementById("p2").innerHTML = players.names[0];
    document.getElementById("p1Game").innerHTML = players.names[1];
    document.getElementById("p2Game").innerHTML = players.names[0];
    document.getElementById("p2Waiting").innerHTML = "Waiting for " + players.names[0] + " to ready up...";
    document.getElementById("p1RU").style.display = "block";

    while(!players.ready[0] || !players.ready[1]) {
        await new Promise(r => setTimeout(r, 1000));

        if(!players.ready[0]) {
            const response = await fetch('/hostReady', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({lobbyCode: lobbyCode})
            });

            let data = await response.json();

            if(data.code == 1) {
                players.ready[0] = true;
                document.getElementById("p2Waiting").innerHTML = players.names[0] + " is ready!";
                console.log("host ready");
            }
        }
    }

    document.getElementById("readyUpP1").style.display = "none";
    document.getElementById("readyUpP2").style.display = "none";
    document.getElementById("playGameP1").style.display = "flex";
    document.getElementById("playGameP2").style.display = "flex";
    

    //wait for country order
    while(countries.length == 0) {
        await new Promise(r => setTimeout(r, 1000));
        const response2 = await fetch('/GetCountryOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lobbyCode: lobbyCode})
        });

        let data2 = await response2.json();

        if(data2.code == 1) {
            countries = data2.countries;
        }
    }
    players.ready[0] = false;
    players.ready[1] = false;
    GameLoop()
}

async function createLobby() {
    var name = document.getElementById("playerNameCreate").value;

    if(name.length == 0) {
        alert("Please enter a name.");
        return;
    }


    if(!debugMode) {
        players.names[0] = name;
        document.getElementById("loading").style.display = "block";
        document.getElementById("menu").style.display = "none";

        //random 16 hex digit lobby code
        lobbyCode = Math.floor(Math.random() * 16**16).toString(16).padStart(16, '0');

        await new Promise(r => setTimeout(r, 1000));

        const response = await fetch('/createLobby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, lobbyCode: lobbyCode})
        });

        await response.json();

        if(response.ok) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("game").style.display = "block";
            document.getElementById("lobbyIdSpan").innerHTML = lobbyCode.toString();
        }else{
            alert("Error creating lobby.");
            document.getElementById("loading").style.display = "none";
            document.getElementById("menu").style.display = "flex";
        }
    }else{
        lobbyCode = "b16c9e7a32fa0000";
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "block";
    }

    //find all class pName and set innerHTML to name
    document.getElementById("p1").innerHTML = name;
    document.getElementById("p1Game").innerHTML = name;
    document.getElementById("p2Waiting").innerHTML = "Waiting for player 2 to join lobby...";
    host = true;

    while(players.names[1] == "") {
        console.log("Waiting for player 2 to join lobby");
        await new Promise(r => setTimeout(r, 1000));

        let response = await fetch('/player2JoinedYet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lobbyCode: lobbyCode})
        });

        let data = await response.json();

        if(data.code == 1) {
            players.names[1] = data.playerTwoName;
            document.getElementById("p2").innerHTML = players.names[1];
            document.getElementById("p2Game").innerHTML = players.names[1];
        }
    }


    document.getElementById("p2Waiting").innerHTML = "Waiting for " + players.names[1] + " to ready up...";
    document.getElementById("p1RU").style.display = "block";


    while(!players.ready[0] || !players.ready[1]) {
        await new Promise(r => setTimeout(r, 1000));

        if(!players.ready[1]) {
            const response = await fetch('/player2Ready', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({lobbyCode: lobbyCode})
            });

            let data = await response.json();

            if(data.code == 1) {
                players.ready[1] = true;
                document.getElementById("p2Waiting").innerHTML = players.names[1] + " is ready!";
            }
        }
    }

    document.getElementById("readyUpP1").style.display = "none";
    document.getElementById("readyUpP2").style.display = "none";
    document.getElementById("playGameP1").style.display = "flex";
    document.getElementById("playGameP2").style.display = "flex";  
    
    const response = await fetch('/CreateCountryOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode})
    });

    let data = await response.json();

    countries = data.countries;
    GameLoop();
}

async function GameLoop() {
    flag = SetFlags();
    while(flag != null) {
        ClearPlayerAnswers();
        ClearFinishRound();
        await Countdown(15);

        sendFinishedRound();
        
        await BothPlayersFinishRound();

        await GetPlayerAnswers();
        UpdateAnswerDisplay();

        if(host) {
            ClearPlayerReady();
        }
        await new Promise(r => setTimeout(r, 3000));

        round++;
        UpdateScoreDisplay();
        // wait till system time is next second

        await BothPlayersReadyForNextRound();
        

        document.getElementById("ga").style.display = "flex";
        document.getElementById("redUp").style.display = "none";

        document.getElementById("flag2").style.display = "none";
        document.getElementById("p1guess").innerHTML = "";
        document.getElementById("guessP1").disabled = false;
        document.getElementById("p2tAnswers").style.display = "none";

        players.answers[0] = "";
        players.answers[1] = "";

        flag = SetFlags();

        await new Promise(r => setTimeout(r, 1000));
    }
}

async function BothPlayersReadyForNextRound() {
    let d = new Date();
    let ms = d.getMilliseconds();
    await new Promise(r => setTimeout(r, 1000 - ms));
    

    while(true) {
        await new Promise(r => setTimeout(r, 1000));
        if(!players.ready[host?0:1]) {
            continue;
        }
        const response = await fetch('/playersReadyForNextRound', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lobbyCode: lobbyCode})
        });

        let data = await response.json();

        if(data.code == 1) {
            break;
        }
    }
}
async function GetPlayerAnswers() {
    const response = await fetch('/GetAnswers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode})
    });

    const data = await response.json();

    players.answers[0] = data.answers[0];
    players.answers[1] = data.answers[1];
}

function UpdateAnswerDisplay() {
    document.getElementById("ga").style.display = "none";
    document.getElementById("redUp").style.display = "flex";
    document.getElementById("p1RU2").style.display = "flex";

    document.getElementById("flag2").style.display = "flex";
    document.getElementById("p1guess").innerHTML = normcountries[flag.toLowerCase()];
    document.getElementById("p1guess").style.color = "black";

    if(players.answers[host?0:1] == "") {
        document.getElementById("flagP1Real").src = "";
        document.getElementById("p2Real").innerHTML = "No answer";
        document.getElementById("p2Real").style.color = "red";
    }else{
        let countryNameById = players.answers[host?0:1];
        let countryID = Object.keys(normcountries).find(key => normcountries[key].toLowerCase() === countryNameById.toLowerCase());
        document.getElementById("flagP1Real").src = "https://flagcdn.com/w160/" + countryID + ".webp";
        document.getElementById("p2Real").innerHTML = countryNameById;
        if(countryID.toLowerCase() == flag.toLowerCase()) {
            document.getElementById("p2Real").style.color = "green";
            UpdateScore(host);
        }else{
            document.getElementById("p2Real").style.color = "red";
        }
    }

    document.getElementById("p2tAnswers").style.display = "flex";
    document.getElementById("flagP2E").src = "https://flagcdn.com/w160/" + flag.toLowerCase() + ".webp";
    document.getElementById("p2Eguess").innerHTML = normcountries[flag.toLowerCase()];
    if(players.answers[!host?0:1] == "") {
        document.getElementById("flagP2EReal").src = "";
        document.getElementById("p2EReal").style.color = "red";
        document.getElementById("p2EReal").innerHTML = "No answer";
    }else{
        let countryNameById = players.answers[!host?0:1];
        let countryID = Object.keys(normcountries).find(key => normcountries[key].toLowerCase() === countryNameById.toLowerCase());
        document.getElementById("flagP2EReal").src = "https://flagcdn.com/w160/" + countryID + ".webp";
        document.getElementById("p2EReal").innerHTML = countryNameById;
        if(countryID.toLowerCase() == flag.toLowerCase()) {
            document.getElementById("p2EReal").style.color = "green";
        }else{
            document.getElementById("p2EReal").style.color = "red";
        }
    }
}
async function BothPlayersFinishRound() {
    //wait for both players to finish
    while(true){
        await new Promise(r => setTimeout(r, 500));
        
        const response = await fetch('/GetFinishRound', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({lobbyCode: lobbyCode})
        });

        let data = await response.json();

        if(data.code == 1) {
            break;
        }
    }

    return true;
}

async function Countdown(startTime){
    let timer = startTime;
    while(timer >= 0) {
        document.getElementById("countDown").innerHTML = timer;
        // document.getElementById("timer").innerHTML = timer;
        await new Promise(r => setTimeout(r, 1000));
        timer--;
    }

    return true;
}

function sendFinishedRound() {
    //send finished round
    fetch('/FinishRound', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode, host: host})
    });
}

function UpdateScore(host) {
    fetch('/UpdateScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode, host: host})
    });
}

function ClearFinishRound() {
    fetch('/ClearFinishRound', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode})
    });
}

async function UpdateScoreDisplay() {
    const response = await fetch('/GetScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode})
    });

    const data = await response.json();
    
    players.scores[0] = data.scores[0];
    players.scores[1] = data.scores[1];

    if(host) {
        document.getElementById("p1Score").innerHTML = players.scores[0] + '/' + round;
        document.getElementById("p2Score").innerHTML = players.scores[1] + '/' + round;
    }else{
        document.getElementById("p1Score").innerHTML = players.scores[1] + '/' + round;
        document.getElementById("p2Score").innerHTML = players.scores[0] + '/' + round;
    }
}
function ClearPlayerAnswers() {
    const response = fetch('/ClearAnswers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode})
    });
}

function ClearPlayerReady() {
    players.ready[0] = false;
    players.ready[1] = false;

    const response = fetch('/ClearReady', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode})
    });
}

async function submitAnswer() {
    if(players.answers[host?0:1] != "") return;
    let answer = document.getElementById("guessP1").value;
    if(answer.length == 0) {
        //turn red
        document.getElementById("guessP1").style.backgroundColor = "red";
        return;
    }

    // check if the answer is in the datalist
    let found = false;
    let options = document.getElementById("count").options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value == answer) {
            found = true;
            break;
        }
    }

    if (!found) {
        //turn red
        document.getElementById("guessP1").style.backgroundColor = "red";
        return;
    }

    
    players.answers[host?0:1] = answer;
    document.getElementById("guessP1").style.backgroundColor = "white";
    document.getElementById("guessP1").value = "";
    document.getElementById("guessP1").disabled = true;
    document.getElementById("p1guess").innerHTML = answer;
    document.getElementById("p1guess").style.color = "black";

    const response = fetch('/submitAnswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode, answer: answer, host: host})
    });

    await response;
}

function clearRed(element){
    element.style.backgroundColor = "white";
}
async function connectToLobby(){
    lobbyCode = document.getElementById("joinLobbyId").value;
    players.names[1] = document.getElementById("playerNamejoin").value;
    if (lobbyCode.length == 0) {
        alert("Please enter a lobby code.");
        return null;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("menu").style.display = "none";
    await new Promise(r => setTimeout(r, 1000));

    
    const response = await fetch('/joinLobby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode, name: players.names[1]})
    });
    const data = await response.json();
    
    if(data.code == 3) {
        alert("Lobby not found.");
        document.getElementById("loading").style.display = "none";
        document.getElementById("menu").style.display = "flex";
    }else if(data.code == 2) {
        alert("Lobby is full.");
        document.getElementById("loading").style.display = "none";
        document.getElementById("menu").style.display = "flex";
    }else if(data.code != 1) {
        alert("Error joining lobby.");
        document.getElementById("loading").style.display = "none";
        document.getElementById("menu").style.display = "flex";
    }else{
        return data;
    }

    return null;
}

function SetFlags() {
    if(countries.length == 0) return null; 
    let flag1 = document.getElementById("flagP1");

    // set src
    flag1.src = "https://flagcdn.com/w160/" + countries[0].toLowerCase() + ".webp";

    // set alt
    flag1.alt = normcountries[countries[0].toLowerCase()];

    //pop the first country
    let country = countries.shift();
    return country;
}


async function ReadyUp(){
    const response = await fetch((host ? '/host' : '/player') + 'ReadyUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({lobbyCode: lobbyCode, playersReady: players.ready})
    });

    let data = await response.json();

    if(data.code == 1) {
        players.ready[host?0:1] = true;
        document.getElementById("p1Waiting").style.display = "block";
        document.getElementById("p1RU").style.display = "none";
        document.getElementById("p1RU2").style.display = "none";

        // document.getElementById("filters").style.display = "none";
    }
}

function joinLobbyMenu() {
    document.getElementById("firstMenu").style.display = "none";
    document.getElementById("joinLobbyMenu").style.display = "block";
}

function createLobbyMenu() {
    document.getElementById("firstMenu").style.display = "none";
    document.getElementById("createLobbyMenu").style.display = "block";
}

function backToMenu() {
    document.getElementById("joinLobbyMenu").style.display = "none";
    document.getElementById("createLobbyMenu").style.display = "none";
    document.getElementById("firstMenu").style.display = "block";
}