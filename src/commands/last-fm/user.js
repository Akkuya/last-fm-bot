const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionCollector,
} = require("discord.js");
const User = require("../../schemas/user");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Sets your last.fm username")
    .addStringOption((option) =>
      option
      .setName("username")
      .setDescription("Sets or updates your current default username.")
      .setRequired(true)
    ),

    
  async execute(interaction, client) {
    const x = interaction.options.getString("username");
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${x}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );
    let obj = await res.json();
    if (obj.error) { return await interaction.reply("That wasn't a valid profile."); }
    let userName = await User.findOne({ userId: interaction.user.id });
    
    if (!userName) {
      userName = await new User({
        _id: mongoose.Types.ObjectId(),
        userId: interaction.user.id,
        userName: x,
      });
      await userName.save().catch(console.error);
      await interaction.reply({
        content: `Your default username has been set to ${x}.`,
      });
    } else {
      let userName = await User.findOneAndUpdate(
        { userId: interaction.user.id },
        { userName: x }
      );
      await userName.save().catch(console.error);
      await interaction.reply({
        content: `Your default username has been updated to **${x}**.`,
      });
    }
  },
};
