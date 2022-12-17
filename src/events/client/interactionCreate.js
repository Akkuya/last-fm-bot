module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      this.options = interaction.options ?? null
      console.log(this.options)
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this command.`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      console.log(this.options)
      if (!button) return new Error("No code");
      
      try {
        await button.execute(interaction, client, this.options);
      } catch {
        console.error()
      }
    }
  },
};
