var express = require('express');
var router = express.Router();
let usersController= require('../controller/usersController');
const multer = require('multer');
const path =require('path');
let loginMiddleware = require('../middlewares/loginMiddleware');

const storage = multer.diskStorage(
	{
		destination: (req,file,cb)=>{ 
            let pathToUse =path.resolve(__dirname,'..','avatar')
            cb(null,pathToUse)},
		filename:  (req,file,cb)=>{ 
            let filename=file.originalname.substr(0,file.originalname.indexOf('.'))+'-' +Date.now() + path.extname(file.originalname)
            cb(null,filename)}
	}
)
const upload = multer({storage:storage})


/* GET admin page*/
router.get('/', loginMiddleware,usersController.adminUser);

/* GET user profile page*/
router.get('/profile/:id', loginMiddleware,usersController.userProfile);
 
/* GET user profile page*/
router.get('/profile/edit/:id',loginMiddleware, usersController.userEdit);


router.put('/profile/edit/:id',upload.any(),loginMiddleware, usersController.update);

/* GET register page. */
router.get('/register', usersController.getRegister);
router.post('/register', usersController.registerUser);

/* GET login page. */
router.get('/login', usersController.getLogin);
router.post('/login',usersController.logInUser );
router.get('/logout',loginMiddleware, usersController.logOutUser);

module.exports = router;
