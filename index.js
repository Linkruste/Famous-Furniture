const { Client, Events, GatewayIntentBits, Intents } = require("discord.js");
const { token } = require("./config.json");
const { furnitures, names, firstNames } = require("./data.json");

const Bot = new Client({intents: [GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages ]});

// Select random element in array.
function SelectRandom(_array)
{
	return _array[Math.floor(Math.random() * _array.length)]
}

function CreateFamousFurniture(_names, _furniture)
{
	return `${SelectRandom(_furniture)} ${SelectRandom(_names)}`;
}

// First argument is the evaluated string, others are words that could be included in the string. Acts like an "AND" operator with all includes.
function DoesStringIncludes()
{
	for(let i = 1; i < arguments.length; i++)
	{
		if(!arguments[0].toLowerCase().includes(arguments[i].toLowerCase()))
			return false;
	}
	return true
}

// First argument is the evaluated string, others are words that could be included in the string. Acts like an "OR" operator with all includes.
function InclusiveStringIncludes()
{
	let _boolResult;
	for (var i = 1; i < arguments.length; i++) 
		_boolResult |= arguments[0].toLowerCase().includes(arguments[i].toLowerCase());
	return _boolResult;
}

Bot.once(Events.ClientReady, _client =>
{
	console.log(`Successfully logged in as ${_client.user.tag}`);
});

Bot.login(token);

Bot.on("messageCreate", _message =>
{
	if((DoesStringIncludes(_message.content, "famous", "furniture") || DoesStringIncludes(_message.content, "célèbre", "meuble")) && _message.content.includes("<@1122279094973902958>"))
		_message.reply(
		{ content:`${ InclusiveStringIncludes(_message.content, "name", "nom") ? SelectRandom(firstNames) : "" } ${ CreateFamousFurniture(names, furnitures) }` });
});