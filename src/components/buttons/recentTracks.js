const { EmbedBuilder } = require(`discord.js`)
const User = require("../../schemas/user");
const mongoose = require("mongoose");

module.exports = {
  data: {
    name: `recent`,
  },
  async execute(interaction, client, options) {
    x = options.getString('user');
    console.log(x)
    if (!y) {
      let userName = await User.findOne({ userId: interaction.user.id });
      y = userName.userName
      console.log(y)
      
    }
    const tracks = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${y}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );
    console.log(options)
    const user = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getInfo&user=${y}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );
    let x = await user.json();
    let name = x.user.name
    


    let object = await tracks.json();
    let top15 = "";
    let top15track = object["recenttracks"]["track"];
    let top15artist = object["recenttracks"]["track"];
    for (let i = 0; i < 15; i++) {
      top15 =
        top15 +
        `${top15track[i]["name"]} - **${top15artist[i]["artist"]["#text"]}**\n`;
    }

    let firstTrackCover = object.recenttracks.track[0].image[2]["#text"]
    console.log(firstTrackCover)
    const embed = new EmbedBuilder()
      .setTitle(`${name}'s Recent Tracks`)
      .addFields({
        name: "Recent tracks",
        value: top15,
        inline: true,
      }).setThumbnail(firstTrackCover);

    await interaction.update({
      content: "",
      embeds: [embed],
      components: [],
    });
  },
};
