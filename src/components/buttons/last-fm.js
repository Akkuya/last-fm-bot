module.exports = {
  data: {
    name: `last-fm`,
  },
  async execute(interaction, client) {
    await interaction.update({
      content: "The button was clicked!",
      embeds: [],
      components: [],
    });
  },
};
