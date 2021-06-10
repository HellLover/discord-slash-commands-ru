"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionsClient = void 0;
const axios_1 = __importDefault(require("axios"));
const apiUrl = "https://discord.com/api/v8";
class InteractionsClient {
    constructor(token, clientID) {
        if (!token) {
            throw new Error("discord-slash-commands-ru | Токен бота пропущен");
        }
        if (!clientID) {
            throw new Error("discord-slash-commands-ru | Айди бота пропущен");
        }
        this.token = token;
        this.clientID = clientID;
    }
    getSlashCommands(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof options !== "object")
                throw new Error("Options must be of type object, but received: " + typeof options);
            if (options.commandID && typeof options.commandID !== "string")
                throw new Error("commandID received but wasn't of type string. Received: " +
                    typeof options.commandID);
            if (options.guildID && typeof options.guildID !== "string")
                throw new Error("guildID received but wasn't of type string. Received: " + typeof options.guildID);
            let url = options.guildID
                ? `${apiUrl}/applications/${this.clientID}/guilds/${options.guildID}/commands`
                : `${apiUrl}/applications/${this.clientID}/commands`;
            if (options.commandID)
                url += `/${options.commandID}`;
            const res = yield axios_1.default.get(url, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            return res.data;
        });
    }
    createSlashCommand(options, guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof options !== "object")
                throw new Error("Options must be of type object, but received: " + typeof options);
            if (!options.name || !options.description)
                throw new Error("Options is missing name or description property!");
            const url = guildID
                ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands`
                : `${apiUrl}/applications/${this.clientID}/commands`;
            const res = yield axios_1.default.post(url, options, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            return res.data;
        });
    }
    editSlashCommand(options, commandID, guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof options !== "object")
                throw new Error("Options must be of type object, but received: " + typeof options);
            if (typeof commandID !== "string")
                throw new Error("commandID must be of type string, but received: " + typeof commandID);
            if (!options.name || !options.description)
                throw new Error("Options is missing name or description property!");
            if (guildID && typeof guildID !== "string")
                throw new Error("guildID received but wasn't of type string. Received: " + typeof guildID);
            const url = guildID
                ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
                : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;
            const res = yield axios_1.default.patch(url, options, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            return res.data;
        });
    }
    deleteSlashCommand(commandID, guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof commandID !== "string")
                throw new Error("commandID must be of type string, but received: " + typeof commandID);
            const url = guildID
                ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}`
                : `${apiUrl}/applications/${this.clientID}/commands/${commandID}`;
            const res = yield axios_1.default.delete(url, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            return res.data;
        });
    }
    getSlashCommandPermissions(guildID, commandID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof guildID !== "string")
                throw new Error("guildID must be of type string. Received: " + typeof guildID);
            if (commandID && typeof commandID !== "string")
                throw new Error("commandID received but wasn't of type string. received: " + typeof commandID);
            const url = commandID
                ? `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}/permissions`
                : `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/permissions`;
            const res = yield axios_1.default.get(url, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            return res.data;
        });
    }
    editSlashCommandPermissions(permissions, guildID, commandID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(permissions))
                throw new Error("permissions must be of type array, but received: " + typeof permissions);
            if (typeof guildID !== "string")
                throw new Error("guildID must be of type string, but received: " + typeof guildID);
            if (typeof commandID !== "string")
                throw new Error("commandID must be of type string, but received: " + typeof commandID);
            const url = `${apiUrl}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}/permissions`;
            const res = yield axios_1.default.put(url, { permissions: permissions }, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            return res.data;
        });
    }
}
exports.InteractionsClient = InteractionsClient;