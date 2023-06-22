import { Events } from 'discord.js'
import { useAppStore } from '@/store/app';

export const event = {
  name: Events.InteractionCreate
}

export const action = async (interaction) => {
  const appStore = useAppStore()
  if (interaction.isChatInputCommand()) {
    await appStore.commandActionMap.get(interaction.commandName)(interaction)
  }
}
