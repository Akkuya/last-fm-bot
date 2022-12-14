const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Returns user avatar.')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('User to fetch avatar from')
        ),

    async execute(interaction, client) {
        let x = interaction.options.getUser('user') ?? interaction.user

        const embed = new EmbedBuilder()
            .setTitle(`Avatar of ${x.tag}`)
            .setColor('000000')
            .setImage(x.displayAvatarURL({ format: 'png', size: 512 }))
        await interaction.reply({
            embeds: [embed]
        })
    }


}