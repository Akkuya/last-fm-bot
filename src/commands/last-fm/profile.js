const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const User = require("../../schemas/user");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Returns Last.fm Profile.")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("User to fetch profile from")
        .setRequired(false)
    ),
  
  async execute(interaction, client) {
    
    let x = interaction.options.getString("user");
    
    if (!x) {
      let userName = await User.findOne({ userId: interaction.user.id });
      if (!userName) {
        return await interaction.reply({
          content: 'You do not have a default username set.'
        })
      } else {
        x = userName.userName
      }
    }
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${x}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );

    let obj = await res.json();
    console.log(obj);

    if (obj.error) {
      return await interaction.reply("That wasn't a valid profile.");
    }
    let user = obj.user;
    let name = user["name"];
    let url = user["url"];

    let pfp = user["image"][2]["#text"];
    if (pfp === "") {
      pfp =
        "https://i.pinimg.com/474x/90/c2/d6/90c2d616c28b39bfc3d35c282dfbde2a.jpg";
    }

    // Date math
    const date = new Date(user.registered["#text"] * 1000);
    let date_joined = date.toDateString();
    date_joined = date_joined.substring(date_joined.indexOf(" ") + 1);

    const tracks = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${x}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );

    let object = await tracks.json();
    let top5 = "";
    let top5track = object["recenttracks"]["track"];
    let top5artist = object["recenttracks"]["track"];
    for (let i = 0; i < 5; i++) {
      top5 =
        top5 +
        `${top5track[i]["name"]} - ${top5artist[i]["artist"]["#text"]}\n`;
    }

    console.log(top5);

    const embed = new EmbedBuilder()
      .setTitle(`${name}'s Profile`)
      .setURL(url)
      .setColor("000000")
      .setThumbnail(pfp)
      .setDescription(`Date Joined: ${date_joined}`)
      .addFields({
        name: "Recent tracks",
        value: top5,
        inline: true,
      });

    const button = new ButtonBuilder()
      .setCustomId("recent")
      .setLabel("Recent Tracks")
      .setStyle(ButtonStyle.Secondary);

    const actions = new ActionRowBuilder()
      .addComponents(button);
    
   

    await interaction.reply({
      embeds: [embed],
      components: [actions],
    });
  },
};
