const multer = require('multer');
const path = require('path');

//set storage engine
const storage = multer.diskStorage({
    destination : './uploads/thumbnail/',
    filename : function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// Initlialize upload
const upload = multer({
    storage : storage,
    limits : { fileSize : 1000000}, //1MB limit
    fileFilter : function(req,file,cb){
        checkFileType(file,cb); 
    }
}).single('thumbnail');

//Check file type
function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error : Images Only!')
    }
}

module.exports = upload;