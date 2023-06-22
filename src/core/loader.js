import { REST, Routes, Collection } from 'discord.js'
import fg from 'fast-glob'

import { useAppStore } from '@/store/app'

const updateSlashCommands = async (commands) => {
  const rest = new REST({ version: 10 })
    .setToken(process.env.TOKEN)
  
  rest.put(Routes.applicationGuildCommands(
    process.env.APPLICATION_ID,
    process.env.GUILD_ID,
  ),
    {
      body: commands
    }
  )
}

export const loadCommands = async () => {
  const appStore = useAppStore()
  const commands = []
  const actions = new Collection()
  const files = await fg('./src/commands/**/index.js')

  for (const file of files) {
    const commandFile = await import(file)
    commands.push(commandFile.command)
    actions.set(commandFile.command.name, commandFile.action)
  }
  
  await updateSlashCommands(commands)
  appStore.commandActionMap = actions
}

export const loadEvents = async () => {
  const appStore = useAppStore()
  const { client } = appStore
  const files = await fg('./src/events/**/index.js')

  for (const file of files) {
    const eventFile = await import(file)

    client[eventFile.event.once ? 'once' : 'on'](
      eventFile.event.name,
      eventFile.action
    )
  }
}