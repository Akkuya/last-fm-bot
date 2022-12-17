const { EmbedBuilder } = require(`discord.js`)

module.exports = {
  data: {
    name: `last-fm`,
  },
  async execute(interaction, client, options) {

    const tracks = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${options.getString('user')}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );
    console.log(options)
    const user = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getInfo&user=${options.getString('user')}&api_key=12e12b0d510784ca126139b82dcee704&format=json`
    );
    let x = await user.json();
    let name = x.user.name
    // let x = options.getString('user')
    // console.log(x)
    let object = await tracks.json();
    let top15 = "";
    let top15track = object["recenttracks"]["track"];
    let top15artist = object["recenttracks"]["track"];
    for (let i = 0; i < 15; i++) {
      top15 =
        top15 +
        `${top15track[i]["name"]} - ${top15artist[i]["artist"]["#text"]}\n`;
    }

    console.log(top15);

    const embed = new EmbedBuilder()
      .setTitle(`${name}'s Top Tracks`)
      .addFields({
        name: "Recent tracks",
        value: top15,
        inline: true,
      });

    await interaction.update({
      content: "",
      embeds: [embed],
      components: [],
    });
  },
};
