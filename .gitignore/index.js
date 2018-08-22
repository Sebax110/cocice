const Discord = require('discord.js')
const bot = new Discord.Client()

var prefix = '_'

bot.on('message', function (message) {
  if (message.content === '_Hello') {
    message.reply('Hello')
      .then(sent => console.log('Sent a reply to ${sent.author.username}'))
      .catch(console.error);  
   }
})
bot.on('message', function (message) {
   if (message.content === '_hello') {
    message.reply('hello') 
      .then(sent => console.log ('Sent a reply to ${sent.author.username}'))
      .catch(console.error);  
   }
})
bot.on('message', function (message) {
    if (message.content === '_ping') {
     message.channel.send('pong')
      .then(sent => console.log ('Sent a reply to $(sent.autor.username'))
      .catch(console.error);  
    }
})

  bot.on('ready', () => {
    console.log('I am ready!');
  });
  
  bot.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith('_kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member.kick('Optional reason that will display in the audit logs').then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Kick effectuer avec succès ${user.tag}`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('Je ne peut pas kick ce membre');
            // Log the error
            console.error(err);
          });
        } else {
          // The mentioned user isn't in this guild
          message.reply('That user isn\'t in this guild!');
        }
      // Otherwise, if no user was mentioned
      } else {
        message.reply('tu dois mentionner une personnes a kick!');
      }
    }
  });
  
  bot.on('ready', () => {
    console.log('I am ready!');
  });
  
  bot.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // if the message content starts with "!ban"
    if (message.content.startsWith('_ban')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
           */
          member.ban({
            reason: 'They were bad!',
          }).then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Ban effectuer avec succès ${user.tag}`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('Je ne peut pas ban ce membre');
            // Log the error
            console.error(err);
          });
        } else {
          // The mentioned user isn't in this guild
          message.reply('That user isn\'t in this guild!');
        }
      } else {
      // Otherwise, if no user was mentioned
        message.reply('Tu dois mentionner un membre a ban!');
      }
    }
  });
  // Create an event listener for messages
bot.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === '_avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Clear
    if (msg.startsWith(prefix + 'CLEAR')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        
      // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.
                        // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
                        if (!message.member.roles.find("name", "DJ")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                        message.channel.send('You need the \`DJ\` role to use this command.'); // This tells the user in chat that they need the role.
                        return; // this returns the code, so the rest doesn't run.
                    }
            
            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
            message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000))
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});
bot.on ('ready', () => {
  bot.user.setPresence({ game: { name: '[_help] afficher les commandes'}});
  console.log("Bot Ready !");

});


bot.on('message', function (message) {
  if (message.content === '_çoçiçe') {
  message.channel.send ("LA PUISSANCE DE LA ÇOÇIÇE !!", {files: ["./image/çcçc.jpg"]});
  }

});

bot.on('message', function (message) {
  if(message.content === '_yaoi') {
    message.reply ("Content(e)", {files: ["./image/Lol.jpg"]});

  }
})

bot.on('message', function (message) {
  if(message.content === '_KOXOB') {
    message.reply ("Je pleure de joie !", {files: ["./image/KOXOBiN.gif"]});
  }
});

bot.on('message', function (message) {
  if(message.content === '_melenchon') {
    message.reply ("Je pleure de joie !", {files: ["./image/melanchon.png"]});
  }
});

bot.on('message', function (message) {
  if(message.content === '_lol') {
    message.channel.send ("HO MON DIEU !", {files: ["./image/54.png"]});
  }
})

bot.on('message', function (message) {
  if(message.content === '_shutup') {
    message.channel.send ("SHUT THE FUCK UP !", {files: ["./image/tenor-3.gif"]});
  }
})

bot.on('message', function (message) {
  if(message.content === '_yuri') {
    message.channel.send ("Yuuuri (pour le pur de plaisir de Yuna)", {files: ["./image/images (13).jpg"]});
  }

})


bot.on('message', function (message) {
  if (message.content === '_help') {
    var embed = new Discord.RichEmbed()
        .setTitle("Help")
        .setColor("0x0404B4")
        .addField("-help", "Affiche toute les commandes")
        .addField("-_çoçiçe", "affiche la sainte saucisse !")
        .addField("-_melenchon", "Bonjour Melenchon")
        .addField("-_yaoi", "Pour le pur plaisir de Léna")
        .addField("-_KOXOB", "Un gif")
        .addField("-_ping", "cette commande est nul TOUT SIMPLEMENT !")
        .addField("_shutup", "SHUT THE FUCK UP !")
        .addField("-_yuri", "Pour le pur plaisir de Yuna")
        .setFooter("Fin !")
    message.channel.sendEmbed(embed);
    
   }
  });

  bot.on('message', function (message) {
    if (message.content === '_desc bubu') {
      var embed = new Discord.RichEmbed()
      .setTitle("Bubu")
      .setColor("0xFF0000")
      .addField(".")
      .setFooter("Fin !")
     message.channel.sendEmbed(embed);

   }
  }); 
        
bot.login('NDgwMDg5NDAyMTQwMjYyNDAw.Dliw1Q.LVr6Gxp5VWlI-HjOYW5eUbmiqBo')
