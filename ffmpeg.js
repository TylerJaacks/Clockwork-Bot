const { exec } = require("child_process");

function compressVideo(inputFile, outputFile) {
    let command = "ffmpeg -i " + inputFile +  " -b 800k " + outputFile;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}