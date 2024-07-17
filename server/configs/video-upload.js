const multer = require('multer');
const path = require('path');

//set storage engine
const storage = multer.diskStorage({
    destination : './uploads/video/',
    filename : function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Initliaze upload
const upload = multer({
    storage : storage,
    limits : {fileSize : 1000000000}, //1GB limit
    fileFilter : function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('video');

// Check file type
function checkFileType(file,cb){
    const filetypes = /mp4|avi|mkv|mov|wmv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error : Video only!')
    }
}

module.exports = upload;