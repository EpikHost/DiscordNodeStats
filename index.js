const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios')

// Make a client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Online!');
});


async function ping(interaction) {
    var botping = Math.round(client.ws.ping)
    let embed = new MessageEmbed()
    .setTitle("Pong!")
    .setDescription(`My latency is ${botping}ms!`)
    await interaction.reply({ embeds: [embed], ephemeral: true });
}



async function stats(interaction){
    //Define the urls
    let NodeOneURL = 'http://127.0.0.1:5000/all'
    
    //Fetch CPU Usage Info
    await axios.get(NodeOneURL)
    .then(async function(response) {
        let info = response["data"]
        let cpu_percentage = info["cpu_percent"]
        let ram_usage = info["ram_usage"]
        let embed = new MessageEmbed()
        .setTitle("Node One Stats!")
        .addFields(
            {"name": "CPU Usage", "value": `${cpu_percentage}%!`},
            {"name": "RAM Usage", "value": `${ram_usage}%!`}
            )
        await interaction.reply({ embeds: [embed], ephemeral: true });



    });
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		ping(interaction);
	} else if (commandName === 'stats') {
		stats(interaction);
    }
});

// Login to Discord with your client's token
client.login(token);