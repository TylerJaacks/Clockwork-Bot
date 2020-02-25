const events = require('./events.js')
const logger = require('./logger.js')
const utils = require('./utils.js')

const fs = require('fs')
const http = require('https');

const cheerio = require("cheerio");
const request = require("request");

const Discord = require('discord.js')

const client = new Discord.Client();

client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log('Clockwork Bot Ready!')
});

client.on('message', message => {
    if (message.content.includes('https://vm.tiktok.com/')) {
      try {
        request({
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11'
          },
          url: message.content
        }, (err, res, body) => {
          let $ = cheerio.load(body);
  
          let videoLink = $("video").attr('src');
  
          console.log(videoLink);
  
          http.get(videoLink, function (response) {
            console.log("Sending TikTok...");
  
            message.channel.send(new Discord.Attachment(response, 'tiktok.mp4')).catch(console.error);
          });
        });
      } catch (err) {
        console.log("Something went wrong was unable to find the TikTok.")
      }
    }
  });