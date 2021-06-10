import axios from "axios";
import { ApplicationCommand, ApplicationOptions, getCommandsOptions } from "./Interfaces";

const apiUrl = "https://discord.com/api/v8";

export class InteractionsClient {
    private token: string;
    public clientID: string;

    constructor(token: string, clientID: string) {
        if (!token) {
            throw new Error("discord-slash-commands-ru | Токен бота пропущен");
        }
        if (!clientID) {
            throw new Error("discord-slash-commands-ru | Айди бота пропущен");
        }
        this.token = token;
        this.clientID = clientID;
    }

    async getSlashCommands(options?: getCommandsOptions): Promise<ApplicationCommand[] | ApplicationCommand> {
        if (typeof options !== "object")
            throw new Error("Options must be of type object, but received: " + typeof options);

        if (options.commandID && typeof options.commandID !== "string")
            throw new Error(
                "commandID received but wasn't of type string. Received: " +
                    typeof options.commandID
            );

        if (options.guildID && typeof options.guildID !== "string")
            throw new Error(
                "guildID received but wasn't of type string. Received: " + typeof options.guildID
            );

        let url = options.guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${options.guildID}/commands`
            : `${apiUrl}/applications/${this.clientID}/commands`;

        if (options.commandID) url += `/${options.commandID}`;

        const res = await axios.get(url, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async createSlashCommand(options: ApplicationOptions, guildID?: string): Promise<ApplicationCommand> {
        if (typeof options !== "object")
            throw new Error("Options must be of type object, but received: " + typeof options);

        if (!options.name || !options.description)
            throw new Error("Options is missing name or description property!");

        const url = guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
            : `${apiUrl}/applications/${this.clientID}/commands`;

        const res = await axios.post(url, options, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async editSlashCommand(options: ApplicationOptions, commandID: string, guildID?: string): Promise<ApplicationCommand> {
        if (typeof options !== "object")
            throw new Error("Options must be of type object, but received: " + typeof options);

        if (typeof commandID !== "string")
            throw new Error("commandID must be of type string, but received: " + typeof commandID);

        if (!options.name || !options.description)
            throw new Error("Options is missing name or description property!");

        if (guildID && typeof guildID !== "string")
            throw new Error(
                "guildID received but wasn't of type string. Received: " + typeof guildID
            );

        const url = guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
            : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

        const res = await axios.patch(url, options, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }

    async deleteSlashCommand(commandID: string, guildID?: string): Promise<boolean> {
        if (typeof commandID !== "string")
            throw new Error("commandID must be of type string, but received: " + typeof commandID);

        const url = guildID
            ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
            : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;

        const res = await axios.delete(url, {
            headers: { Authorization: `Bot ${this.token}` },
        });

        return res.data;
    }
}