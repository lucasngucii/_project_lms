import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, TextChannel, GatewayIntentBits } from 'discord.js';
@Injectable()
export class DiscordLogger implements OnModuleInit {
  private client: Client;
  private channel: TextChannel;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }
  async onModuleInit() {
    await this.intializeDiscordClient();
  }

  private async intializeDiscordClient() {
    const token = this.configService.get<string>('DISCORD_BOT_TOKEN');
    const channelId = this.configService.get<string>('DISCORD_CHANNEL_ID');

    if (token && channelId) {
      await this.client.login(token);
      this.client.on('ready', async (client) => {
        console.log(`Logged in as ${client.user.tag}`);
        this.channel = (await this.client.channels.fetch(
          channelId,
        )) as TextChannel;
      });
    }
  }
  async sendMessage(embed: any) {
    if (this.channel) {
      try {
        await this.channel.send({ embeds: [embed] });
      } catch (error) {
        console.error(`Error sending message to discord: ${error}`);
      }
    }
  }
}
