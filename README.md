# discord-slash-commands-ru
Модуль с русским переводом для Дискорд ботов, чтобы легко создать слеш-команды и управлять ими.

# Использование
```javascript
const { SlashClient } = require("discord-slash-commands-ru");
// Для TypeScript: import { SlashClient } from "discord-slash-commands-ru";

const interaction = new SlashClient("Токен вашего бота", "ID вашего бота");

interaction.getSlashCommands({}).then(console.log); // Показывает все созданные слеш-команды
// Чтобы получить конкретную глобальную команду - interaction.getSlashCommands({ commandID: Айди команды })
// Чтобы получить конкретную команду только для указанного сервера - interaction.getSlashCommands({ commandID: "Айди команды", guildID: "Айди сервера" })

// Создание новой глобальной слеш-команды
interaction
  .createSlashCommand({ name: "Название команды", description: "Описание команды" })
  .then(console.log)
// Если хотите создать только для указанного сервера - interaction.createSlashCommand({ name: "Название команды", description: "Описание команды" }, "Айди сервера")

// Редактирование глобальной слеш-команды
interaction
  .editSlashCommand({ name: "Новое название для команды", description: "Новое описание для команды" }, "ID команды, которую хотите редактировать")
  .then(console.log)
// Если хотите редактировать команду указанного сервера - interaction.editSlashCommand({ name: "Новое название для команды", description: "Новое описание для команды" }, "ID команды, которую хотите редактировать", "Айди сервера")

// Удаление глобальной слеш-команды
interaction
  .deleteSlashCommand("ID команды, которую вы хотите удалить")
  .then(console.log)
  .catch(console.error);
// Чтобы удалить команду указанного сервера - interaction.deleteCommand("ID команды, которую вы хотите удалить", "Айди сервера")
```

# Discord
Если у вас есть вопросы, мой Дискорд: HellLover#9626