const { ActivityType } = require(`discord.js`);

module.exports = {
  name: "ready",
  once: "true",
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}.`);
    client.user.setPresence({
      activities: [{ 
        name: "peak music", 
        type: ActivityType.Listening 
      }],
      status: "dnd",
    });
  },
};
