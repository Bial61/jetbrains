const path = require('path')
const express = require('express')
const hbs= require ('hbs')
const multer = require('multer')
const fs= require('fs')

const {convertWordFiles} = require("convert-multiple-files");
// const {Powerpoint,Word} =require("pdf-officegen");

const app = express()
const port = process.env.PORT || 3000

//set path of views and static assests
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials') 

//Setup for handelbars engine and views
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

//Use static assests like css,client side js, images
app.use(express.static(publicDirectoryPath))


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "/uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   });



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending .jpg
  }
})


const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    },
    storage
})


app.post('/doc',upload.single('file'),async (req,res)=>
{

   
    try 
    {
        await convertWordFiles(path.join(__dirname,`../uploads/${req.file.originalname}`), 'pdf', path.join(__dirname,'../converted'));
        var nameFile = req.file.originalname.split('.');
        nameFile[0]=nameFile[0]+'.pdf';
        console.log(nameFile[0]);
        res.sendFile(path.join(__dirname,`../converted/${nameFile[0]}`),null,(err)=>
        {
            if(err)
            {
                throw new Error("Fail to send File.")
            }else
            {
                 //
            }
        })


    } catch (error) 
    {
          res.send({
              error:"Main error hy ye"
          });    
    } 
    


})

// app.get('/word', async (req,res)=>
// {
 

//     const paths =path.join(__dirname,'../hi.pdf')
//     const p = new Word();
//     await p.convertFromPdf([paths] ,path.join(__dirname,'../'), (err, result) => {
//         //Do something with the result (filepath to output) 
    
//       })

// })






app.listen(port, () => {
    console.log('Server is up on port'+port)
})