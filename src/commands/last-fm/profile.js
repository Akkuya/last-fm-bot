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
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${x}&api_key=12e12b0d510784ca126139b82dcee704&format=json`)
        
        let obj = await res.json();
        console.log(obj)

        if (obj.error) { interaction.reply('That wasn\'t a valid profile.'); return;}
        let user = obj.user
        let name = user['name']
        let url = user['url']
        let pfp = user['image'][2]['#text']
        
        // Date math
        const date = new Date(user.registered['#text']*1000)
        let date_joined = date.toDateString()
        date_joined = date_joined.substring(date_joined.indexOf(' ') + 1)


        if (pfp === '') {pfp = 'https://i.pinimg.com/474x/90/c2/d6/90c2d616c28b39bfc3d35c282dfbde2a.jpg'}


        const embed = new EmbedBuilder()
            .setTitle(name)
            .setURL(url)
            .setColor('000000')
            .setThumbnail(pfp)
            .setDescription(`Date Joined: ${date_joined}`)
        await interaction.reply( { embeds: [embed] })
    }


}