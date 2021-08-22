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
    let NodeOneCpuURL = 'http://127.0.0.1:5000/cpuusage'
    let NodeOneRamURL = 'http://127.0.0.1:5000/ramusage'
    
    //Fetch CPU Usage Info
    axios.get(NodeOneCpuURL)
    .then(function(response) {
        let NodeOneCpuData = response["data"]
        let NodeOneCpuSage = NodeOneCpuData["data"]
        console.log(cpuusage)
    let embed = new MessageEmbed()
    .setTitle("Node One Stats!")
    .addFields(
        {"title": "CPU Usage", "description": `${cpuusage}%!`},
        {"title": "RAM Usage", "description": `${ramusage}%!`}
        )
    })

    //Fetch RAM Usage Info
    axios.get(NodeOneRamURL)

}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		ping(interaction);
	} else if (commandName === 'stats') {
		NodeOneCPU(interaction);
    }
});

// Login to Discord with your client's token
client.login(token);