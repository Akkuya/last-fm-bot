const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Returns Last.fm Profile.')
        .addStringOption(option => 
            option
                .setName('user')
                .setDescription('User to fetch profile from')
                .setRequired(true)
        ),
    
    async execute(interaction, client) {
        let x = interaction.options.getString('user')
        let obj;
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${x}&api_key=12e12b0d510784ca126139b82dcee704&format=json`)
        
        obj = await res.json();
        console.log(obj)
        if (obj.error) { interaction.reply('That wasn\'t a valid profile.'); return;}
        const embed = new EmbedBuilder()
            .setTitle(`${obj.user['name']}'s Profile`)
            .setURL(obj.user['url'])
            .setColor('000000')
            .setThumbnail(`${obj.user['image'][2]['#text']}`)
        
        await interaction.reply( { embeds: [embed] })
    }


}