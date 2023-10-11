const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Define the file name (you can use a custom strategy)
    },
});

// Create a multer instance
const upload = multer({ storage });

// app = instancia express criada em index.js
// dependencias sao gerenciadas pelo consign
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use('/games/:id/uploadImg', upload.single('file')); // 
} 