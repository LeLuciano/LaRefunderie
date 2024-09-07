const { Listener } = require("@sapphire/framework");
const { ActivityType } = require("discord.js");

class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: "ready",
    });
  }

  async run(client) {
    const { username, id } = client.user;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);

    client.user.setPresence({
      activities: [
        {
          name: "👀 La Formation. 👀",
          state: "",
          type: ActivityType.Custom,
        },
      ],
      status: "dnd",
    });
    console.log();
  }
}

module.exports = {
  ReadyListener,
};
