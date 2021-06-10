const Discord = require("discord.js");
const interactions = require("../lib/index");

// create a new client
const client = new Discord.Client();
const token = "ODQyNzY2NzU4NTMyMDg3ODE4.YJ6FtQ.MtLDLvuLmGC54tnRO0DwD9HqUBA";

// attach the interaction client to discord.js client
client.interactions = new interactions.SlashClient(token, "842766758532087818");

// attach and event listener for the ready event
client.on("ready", () => {
    console.log("Client is ready!");

    // Create a new command that we can test
    client.interactions.createSlashCommand().catch(console.error).then(console.log);
});

client.ws.on("INTERACTION_CREATE", (interaction) => {
    console.log(interaction);
});

// login
client.login(token);