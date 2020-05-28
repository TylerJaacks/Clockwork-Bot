const Discord = require('discord.js')
const TikTokScrapper = require('tiktok-scraper');

const client = new Discord.Client();

const embedExample = {
    "embed": {
        "title": "TikTok",
        "description": "Tik Tok Discription",
        "url": "https://vm.tiktok.com/KYKLmw/",
        "color": 2486866,
        "footer": {
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
            "text": "Clockwork Bot"
        },
            "image": {
            "url": "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        "author": {
            "name": "Tik Tok User",
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        "fields": [
            {
            "name": "Authors Name",
            "value": "Authors Name"
            },
            {
            "name": "Sound",
            "value": "Link to the Sound"
            },
            {
            "name": "Post Date",
            "value": "Post Date"
            }
        ]
    }
};

const options = {
    // Number of posts to scrape: {int default: 20}
    number: 50,
 
    // Set proxy {string[] | string default: ''}
    // http proxy: 127.0.0.1:8080
    // socks proxy: socks5://127.0.0.1:8080
    // You can pass proxies as an array and scraper will randomly select a proxy from the array to execute the requests
    proxy: '',
 
    // Set to {true} to search by user id: {boolean default: false}
    by_user_id: false,
 
    // How many post should be downloaded asynchronously. Only if {download:true}: {int default: 5}
    asyncDownload: 5,
 
    // How many post should be scraped asynchronously: {int default: 3}
    // Current option will be applied only with current types: music and hashtag
    // With other types it is always 1 because every request response to the TikTok API is providing the "maxCursor" value
    // that is required to send the next request
    asyncScraping: 3,
 
    // File path where all files will be saved: {string default: 'CURRENT_DIR'}
    filepath: `CURRENT_DIR`,
 
    // Custom file name for the output files: {string default: ''}
    fileName: `CURRENT_DIR`,
 
    // Output with information can be saved to a CSV or JSON files: {string default: 'na'}
    // 'csv' to save in csv
    // 'json' to save in json
    // 'all' to save in json and csv
    // 'na' to skip this step
    filetype: `na`,
 
    // Custom User-Agent
    // {string default: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36' }
    userAgent: '',
 
    // Randomize user-agent version: {boolean default: false}
    // Can be usefull against TikTok blockings
    randomUa: false,
    
    // Download video without the watermark: {boolean default: false}
    // Set to true to download without the watermark
    // This option will affect the execution speed
    noWaterMark: false,
    
    // Create link to HD video: {boolean default: false}
    // This option will only work if {noWaterMark} is set to {true}
    hdVideo: false,
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('message', msg => {
    if (msg.content.includes('https://vm.tiktok.com')) {
        console.log('Contains a TikTok link!');

        var urlRegex = /(https?:\/\/[^ ]*)/;

        var input = msg.content;
        var url = input.match(urlRegex)[1];

        (async () => {
            try {
                const videoMeta = await TikTokScrapper.getVideoMeta(url, options);

                console.log(videoMeta.videoUrl);

                const attachment = new Discord.Attachment(videoMeta.videoUrl, 'tiktok.mp4');

                msg.channel.send(attachment);
            } catch (error) {
                console.log(error);
            }
        })();
    }

    // Bot Commands
    if (msg.content === '+about') {
        console.log(msg.content);

        msg.reply('Hi my name is Clockwork Bot and I post TikTok videos!');
    }

    if (msg.content === '+help') {
        console.log(msg.content);

        msg.reply('Just post a TikTok link and let me handle the rest.');
    }
});
  
client.login(process.env.TOKEN);