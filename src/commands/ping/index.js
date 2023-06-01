import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder().setName('ping').setDescription('Get discord bot latency')

export const action = async (ctx) => {
  ctx.reply('pong!')
}

