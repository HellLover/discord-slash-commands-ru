import { ApplicationCommand, ApplicationCommandPermissions, ApplicationOptions, getCommandsOptions, GuildApplicationCommandPermissions } from "./Interfaces";
export declare class InteractionsClient {
    private token;
    clientID: string;
    constructor(token: string, clientID: string);
    getSlashCommands(options?: getCommandsOptions): Promise<ApplicationCommand[] | ApplicationCommand>;
    createSlashCommand(options: ApplicationOptions, guildID?: string): Promise<ApplicationCommand>;
    editSlashCommand(options: ApplicationOptions, commandID: string, guildID?: string): Promise<ApplicationCommand>;
    deleteSlashCommand(commandID: string, guildID?: string): Promise<boolean>;
    getSlashCommandPermissions(guildID: string, commandID?: string): Promise<GuildApplicationCommandPermissions[] | GuildApplicationCommandPermissions>;
    editSlashCommandPermissions(permissions: ApplicationCommandPermissions[], guildID: string, commandID: string): Promise<GuildApplicationCommandPermissions>;
}
