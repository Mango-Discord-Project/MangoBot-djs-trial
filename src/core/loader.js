import { REST, Routes } from 'discord.js'
import fg from 'fast-glob'

const updateSlashCommands = async (commands = loadCommands(), GUILD_ID = process.env.GUILD_ID) => {
  const rest = new REST({
    version: 10,
  }).setToken(process.env.TOKEN)
  const result = await rest.put(
    Routes.applicationCommands(
      process.env.APPLICATION_ID,
      `${GUILD_ID}`
    ),
    {
      body: commands
    }
  )
  return result
}

export const loadCommands = async () => {
  const commands = []
  const files = await fg('./src/commands/**/index.js')
  for (const file of files) {
    const commandObject = await import(file)
    commands.push(cmd.command)
  }
  await updateSlashCommands(commands)
}