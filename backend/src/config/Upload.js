const multer = require('multer');

// path nativo do node
const path = require('path');

// configuração do destino das imagens
module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), 
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    })
}