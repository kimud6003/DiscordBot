require("dotenv").config();
const CryptoJS = require("crypto-js");
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";
// console.log(process.env.Token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).split(" "); 
        const command = args.shift().toLowerCase();

        if (command === 'aesenc') {
            const encrypted = CryptoJS.AES.encrypt(args.toString(),process.env.key);
            msg.reply(`\n origin : ${args} \n encrypted : ${encrypted}`);

        } else if(command === 'aesdec'){
            const bytes = CryptoJS.AES.decrypt(args.toString(),process.env.key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            msg.reply(`\n origin : ${args} \n decrypted : ${decrypted}`);
        }
    }
});

client.login(process.env.Token);