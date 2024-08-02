const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://username:1FpXKTtplLkXX38e@cluster0.stlzdn3.mongodb.net/';
const client = new MongoClient(uri);

const bodyParser = require('body-parser');
const { count } = require('console');

const countries = [
    "ad",
    "ae",
    "af",
    "ag",
    "ai",
    "al",
    "am",
    "ao",
    "aq",
    "ar",
    "as",
    "at",
    "au",
    "aw",
    "ax",
    "az",
    "ba",
    "bb",
    "bd",
    "be",
    "bf",
    "bg",
    "bh",
    "bi",
    "bj",
    "bl",
    "bm",
    "bn",
    "bo",
    "bq",
    "br",
    "bs",
    "bt",
    "bv",
    "bw",
    "by",
    "bz",
    "ca",
    "cc",
    "cd",
    "cf",
    "cg",
    "ch",
    "ci",
    "ck",
    "cl",
    "cm",
    "cn",
    "co",
    "cr",
    "cu",
    "cv",
    "cw",
    "cx",
    "cy",
    "cz",
    "de",
    "dj",
    "dk",
    "dm",
    "do",
    "dz",
    "ec",
    "ee",
    "eg",
    "eh",
    "er",
    "es",
    "et",
    "eu",
    "fi",
    "fj",
    "fk",
    "fm",
    "fo",
    "fr",
    "ga",
    "gb",
    "gb-eng",
    "gb-nir",
    "gb-sct",
    "gb-wls",
    "gd",
    "ge",
    "gf",
    "gg",
    "gh",
    "gi",
    "gl",
    "gm",
    "gn",
    "gp",
    "gq",
    "gr",
    "gs",
    "gt",
    "gu",
    "gw",
    "gy",
    "hk",
    "hm",
    "hn",
    "hr",
    "ht",
    "hu",
    "id",
    "ie",
    "il",
    "im",
    "in",
    "io",
    "iq",
    "ir",
    "is",
    "it",
    "je",
    "jm",
    "jo",
    "jp",
    "ke",
    "kg",
    "kh",
    "ki",
    "km",
    "kn",
    "kp",
    "kr",
    "kw",
    "ky",
    "kz",
    "la",
    "lb",
    "lc",
    "li",
    "lk",
    "lr",
    "ls",
    "lt",
    "lu",
    "lv",
    "ly",
    "ma",
    "mc",
    "md",
    "me",
    "mf",
    "mg",
    "mh",
    "mk",
    "ml",
    "mm",
    "mn",
    "mo",
    "mp",
    "mq",
    "mr",
    "ms",
    "mt",
    "mu",
    "mv",
    "mw",
    "mx",
    "my",
    "mz",
    "na",
    "nc",
    "ne",
    "nf",
    "ng",
    "ni",
    "nl",
    "no",
    "np",
    "nr",
    "nu",
    "nz",
    "om",
    "pa",
    "pe",
    "pf",
    "pg",
    "ph",
    "pk",
    "pl",
    "pm",
    "pn",
    "pr",
    "ps",
    "pt",
    "pw",
    "py",
    "qa",
    "re",
    "ro",
    "rs",
    "ru",
    "rw",
    "sa",
    "sb",
    "sc",
    "sd",
    "se",
    "sg",
    "sh",
    "si",
    "sj",
    "sk",
    "sl",
    "sm",
    "sn",
    "so",
    "sr",
    "ss",
    "st",
    "sv",
    "sx",
    "sy",
    "sz",
    "tc",
    "td",
    "tf",
    "tg",
    "th",
    "tj",
    "tk",
    "tl",
    "tm",
    "tn",
    "to",
    "tr",
    "tt",
    "tv",
    "tw",
    "tz",
    "ua",
    "ug",
    "us",
    "uy",
    "uz",
    "va",
    "vc",
    "ve",
    "vg",
    "vi",
    "vn",
    "vu",
    "wf",
    "ws",
    "xk",
    "ye",
    "yt",
    "za",
    "zm",
    "zw"
]


app.use(bodyParser.json());

app.get('/', (req, res) => {
    // load the index.html file from the public directory
    res.sendFile(__dirname + '/public/index.html');
});



app.post('/submitAnswer', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            let newValues;
            if(req.body.host){
                newValues = {$set: {playerAnswer: [req.body.answer, game.playerAnswer[1]]}};
            }else{
                newValues = {$set: {playerAnswer: [game.playerAnswer[0], req.body.answer]}};
            }
            const result = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
            if(result.acknowledged){
                res.json({code: 1});
            }else{
                res.json({code: 0});
            }
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not submit answer: " + err);
    }
});

app.post('/GetAnswers', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            res.json({code: 1, answers: game.playerAnswer});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not get answers: " + err);
    }
});

app.post('/ClearAnswers', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            const newValues = {$set: {playerAnswer: ["", ""]}};
            const result = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
            if(result.acknowledged){
                res.json({code: 1});
            }else{
                res.json({code: 0});
            }
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not clear answers: " + err);
    }
});

app.post('/ClearReady', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            const newValues = {$set: {playerReady: [false, false]}};
            const result = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
            if(result.acknowledged){
                res.json({code: 1});
            }else{
                res.json({code: 0});
            }
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not clear ready status: " + err);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    // color the text in the console
    console.log('\x1b[35m%s\x1b[0m', `Server is running on port ${PORT}`);
});

app.post('/FinishRound', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
           if(req.body.host){
                const newValues = {$set: {playerFinished: [true, game.playerFinished[1]]}};
                await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
                res.json({code: flagGame.acknowledged ? 1 : 0});
           }else{
                const newValues = {$set: {playerFinished: [game.playerFinished[0], true]}};
                await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
                res.json({code: flagGame.acknowledged ? 1 : 0});
           }
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not finish round: " + err);
    }
});

app.post('/GetFinishRound', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            res.json({code: game.playerFinished[0] && game.playerFinished[1] ? 1 : 0});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not get finish round: " + err);
    }
});

app.post('/ClearFinishRound', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const newValues = {$set: {playerFinished: [false, false]}}
        const result = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
        if(result.acknowledged){
            res.json({code: 1});
        }else{
            res.json({code: 0});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not clear finish round: " + err);
    }
});

//post /createLobby asyn
app.post('/createLobby', async(req, res) => {
    try{
        const name = req.body.name;
        const lobbyCode = req.body.lobbyCode;
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const latestID = await GetLatestIDFromDatabase();
        const game = {
            lobbyID: latestID + 1,
            lobbyCode: lobbyCode,
            numOfPlayers: 1,
            playerNames: [name],
            finished: false,
            playerFinished: [false, false],
            playerReady: [false, false],
            playerAnswer: ["", ""],
            playerScore: [0, 0],
        }
        // make loby code green
        console.log('\x1b[32m%s\x1b[0m', "Creating lobby with code: " + lobbyCode);
        const result = await flagGame.insertOne(game);

        res.json({ok: result.acknowledged});
    }catch(err){
        res.json({ok: false});
        // red text
        console.log('\x1b[31m%s\x1b[0m', "Could not create lobby: " + err);
    }
});

app.post('/UpdateScore', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            let newValues;
            if(req.body.host){
                //increment player 1 score
                newValues = {$set: {playerScore: [game.playerScore[0] + 1, game.playerScore[1]]}};
            }else{
                //increment player 2 score
                newValues = {$set: {playerScore: [game.playerScore[0], game.playerScore[1] + 1]}};
            }
            const result = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
            if(result.acknowledged){
                res.json({code: 1});
            }else{
                res.json({code: 0});
            }
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not update score: " + err);
    }
});

app.post('/GetScore', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            res.json({code: 1, scores: game.playerScore});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not get score: " + err);
    }
});

app.post('/joinLobby', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game.numOfPlayers < 2){
            const newValues = {$set: {numOfPlayers: 2, playerNames: [game.playerNames[0], req.body.name]}};
            await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, newValues);
            const newGame = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
            res.json({code : 1, players: newGame.playerNames}); 
        }else if(game === null){
            res.json({code : 3});
        }else{
            res.json({code : 2});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not join lobby: " + err);
    }
});

app.post('/player2Ready', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 0});
        }else{
            if(game.playerReady[1]){
                res.json({code: 1, playerTwoReady: game.playerReady[1]});
            }else{
                res.json({code: 0});
            }
        }
    }catch(err){
        res.json({ok: false});
        console.log('\x1b[31m%s\x1b[0m', "Could not check if player 2 is ready: " + err);
    }
});

app.post('/hostReady', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});

        if(game === null){
            res.json({code: 2});
        }else{
            if(game.playerReady[0]){
                res.json({code: 1, playerTwoReady: game.playerReady[0]});
            }else{
                res.json({code: 3});
            }
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not check if host is ready: " + err);
    }
});

app.post('/player2JoinedYet', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            res.json({code: game.playerNames.length > 1 ? 1 : 0, playerTwoName: game.playerNames[1]});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not check if player 2 joined: " + err);
    }
});

app.post('/hostReadyUp', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const gameX = await FindLobby(req.body.lobbyCode);
        if(gameX === null){
            console.log('\x1b[31m%s\x1b[0m', "Could not find lobby with ID: " + req.body.lobbyCode);
            res.json({code: 0});
            return;
        }
        const game = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, {$set: {playerReady: [true, gameX.playerReady[1]]}});
        if(game.acknowledged){
            res.json({code: 1});
        }else{
            res.json({code: 0});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not check if host is ready: " + err);
    }
});

app.post('/playerReadyUp', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const gameX = await FindLobby(req.body.lobbyCode);
        if(gameX === null){
            console.log('\x1b[31m%s\x1b[0m', "Could not find lobby with ID: " + req.body.lobbyCode);
            res.json({code: 0});
            return;
        }
        const game = await flagGame.updateOne({lobbyCode: req.body.lobbyCode}, {$set: {playerReady: [gameX.playerReady[0], true]}});
        if(game.acknowledged){
            res.json({code: 1});
        }else{
            res.json({code: 0});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not update player 2 ready status: " + err);
    }
});

app.post('/playersReadyForNextRound', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else{
            res.json({code: game.playerReady[0] && game.playerReady[1] ? 1 : 0});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not check if players are ready for the next round: " + err);
    }
});

app.post('/CreateCountryOrder', async(req, res) => {
    try{
        await GiveRandomCountryOrder(req.body.lobbyCode);
        res.json({code: 1, countries: countries});
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not create country order: " + err);
    }
});
 
app.post('/GetCountryOrder', async(req, res) => {
    try{
        await client.connect();
        const database = client.db('FlagGame');
        const flagGame = database.collection('Flags');
        const game = await flagGame.findOne({lobbyCode: req.body.lobbyCode});
        if(game === null){
            res.json({code: 2});
        }else if(game.countryOrder){
            res.json({code: 1, countries: game.countryOrder});
        }else{
            res.json({code: 3});
        }
    }catch(err){
        res.json({code: 0});
        console.log('\x1b[31m%s\x1b[0m', "Could not get country order: " + err);
    }
});
app.use(express.static('public'));

async function GetLatestIDFromDatabase(){
    await client.connect();
    const database = client.db('FlagGame');
    const flagGame = database.collection('Flags');
    const querry = {};
    const options = {
        sort: {"lobbyID": -1},
        limit: 1,
        projection: {"lobbyID": 1, "_id": 0}
    }
    const cursor = await flagGame.findOne(querry, options);
    if(cursor === null) return 0;
    return cursor.lobbyID;
}

async function FindLobby(id){
    await client.connect();
    const database = client.db('FlagGame');
    const flagGame = database.collection('Flags');
    const querry = {lobbyCode: id};
    const cursor = await flagGame.findOne(querry);
    return cursor;
}

async function GiveRandomCountryOrder(id){
    countries.sort(() => Math.random() - 0.5);
    await client.connect();
    const database = client.db('FlagGame');
    const flagGame = database.collection('Flags');
    const querry = {lobbyCode: id};
    const newValues = {$set: {countryOrder: countries}};
    await flagGame.updateOne(querry, newValues);
}

// disconnect from the database when the app is closed
process.on('SIGINT', () => {
    client.close();
    process.exit();
});

