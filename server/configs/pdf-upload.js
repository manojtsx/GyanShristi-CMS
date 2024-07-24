const multer = require('multer');
const path = require('path');

//set storage engine
const storage = multer.diskStorage({
    destination : './uploads/pdf/',
    filename : function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Initliaze upload
const upload = multer({
    storage : storage,
    limits : {fileSize : 100000000}, //100MB limit
    fileFilter : function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('pdf');

// Check file type
function checkFileType(file,cb){
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error : PDF only!')
    }
}

module.exports = upload;