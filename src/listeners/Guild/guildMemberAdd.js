const { Listener } = require("@sapphire/framework");
const { Captcha } = require("discord.js-captcha");
const {
  ActivityType,
  EmbedBuilder,
  Colors,
  GuildMember,
} = require("discord.js");

const { channels } = require("../../data/config.json");

class GuildMemberAddListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: "guildMemberAdd",
    });
  }

  /**
   *
   * @param {GuildMember} member
   */

  async run(member) {
    this.container.logger.info(`User ${member.user.tag} joined the server`);

    //: Setting up a custom prompt embed for the captcha
    const promptEmbed = new EmbedBuilder()
      .setTitle(`Bienvenue ${member.user.displayName} !`)
      .setDescription(
        "Pour accéder au serveur, veuillez résoudre le captcha ci-dessous."
      )
      .setColor(Colors.DarkBlue)
      .setFooter({
        text: "Tu as 3 essais pour résoudre le captcha, pas 1 de plus.",
      })
      .setTimestamp();

    //: Setting up a custom success embed for the captcha
    const successEmbed = new EmbedBuilder()
      .setTitle("Captcha résolu")
      .setDescription(
        `Tu as résolu le captcha avec succès !\nMaintenant tu dois passer par une derniere étape, la **Whitelist**.\nLe fameux salon <#${channels.whitelistChatChannel.id}> t'attend !`
      )
      .setColor(Colors.DarkGold)
      .setFooter({ text: "Tu as réussi à résoudre le captcha." })
      .setTimestamp();

    //: Setting up a custom failure embed for the captcha
    const failureEmbed = new EmbedBuilder()
      .setTitle("Captcha non résolu")
      .setDescription(
        `Tu n'as pas réussi à résoudre le captcha. Tu vas être expulsé du serveur.`
      )
      .setColor(Colors.Red)
      .setFooter({ text: "Tu n'as pas réussi à résoudre le captcha." })
      .setTimestamp();

    //: Create a new captcha client
    const captcha = new Captcha(this.container.client, {
      roleID: "1281728477724282880",
      channelID: "1281728155962572882",
      sendToTextChannel: true,
      addRoleOnSuccess: true,
      kickOnFailure: true,
      caseSensitive: true,
      attempts: 3,
      timeout: 30000,
      showAttemptCount: false,
      customPromptEmbed: promptEmbed,
      customSuccessEmbed: successEmbed,
      customFailureEmbed: failureEmbed,
    });

    await captcha.present(member);
  }
}

module.exports = {
  GuildMemberAddListener,
};
