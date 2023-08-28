const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "cricketteam.db");

let db = null;

const initializeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })

        app.listen(3006, () => {
            console.log("Server is running at port 3006");
        });

    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
}

initializeDbAndServer();

let updateItemNames = (item) => {

    return {
        playerId: item.player_id,
        playerName: item.player_name,
        jerseyNumber: item.jersey_number,
        role: item.role
    }

}

//getting all players
app.get("/players/", async (request, response) => {
    const gettingPlayersQuery = `
        SELECT 
            *
        FROM
            cricket_team;
    `;

    let playersResponse = await db.all(gettingPlayersQuery);
    let modifiedData = [];
    for (let item of playersResponse) {
        let updatedItem = updateItemNames(item);
        modifiedData.push(updatedItem);
    }

    response.send(modifiedData);

});

//adding new player
app.post("/players/", async (request, response) => {
    const { playerName, jerseyNumber, role } = request.body;
    const addingNewPlayerQuery = `
        INSERT INTO
            cricket_team(player_name, jersey_number, role)
        VALUES
            (
                '${playerName}',
                ${jerseyNumber},
                '${role}'
            );
    `;
    await db.run(addingNewPlayerQuery);

    response.send({ message: "Player Added to team" });

});

//getting player by id
app.get("/players/:playerId", async (request, response) => {
    const { playerId } = request.params;
    const gettingSpecifiedPlayerQuery = `
        SELECT 
            *
        FROM
            cricket_team
        WHERE 
            player_id = ${playerId};
    `;
    const playerResponse = await db.get(gettingSpecifiedPlayerQuery);

    if (playerResponse !== undefined) {
        let modifiedData = updateItemNames(playerResponse);
        response.send(modifiedData);
    } else {
        response.send({message: "No Data Found"});
    }

});

//updating player details
app.put("/players/:playerId", async (request, response) => {
    const { playerId } = request.params;
    const { playerName, jerseyNumber, role } = request.body;

    const updatingQuery = `
        UPDATE
            cricket_team
        SET 
            player_name = '${playerName}',
            jersey_number = ${jerseyNumber},
            role = '${role}'
        WHERE 
            player_id = ${playerId};
    `;

    await db.run(updatingQuery);
    response.send({ message: "Player Details Updated" });

});

//deleting player
app.delete("/players/:playerId", async (request, response) => {
    const { playerId } = request.params;

    const deleteQuery = `
        DELETE FROM 
            cricket_team
        WHERE
            player_id = ${playerId};
    `;
    await db.run(deleteQuery);
    response.send({ message: "Player removed" });

});




