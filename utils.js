const fs = require('fs')

module.exports = {
    readFileToString: function (filename) {
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) throw err;
        
            console.log(data)

            return data;
        })
    }
}