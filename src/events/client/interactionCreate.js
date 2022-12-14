module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName)

           
            try {
                await command.execute(interaction, client)
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wrong while executing this command`,
                    ephemeral: true
                })
            }
        }
    }
}