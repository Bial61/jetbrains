const path = require('path')
const express = require('express')
const hbs= require ('hbs')



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


app.post('/doc',async (req,res)=>
{

    res.send(req.body);

    // try 
    // {
    //     await convertWordFiles(req.body.path, 'pdf', path.join(__dirname,'../'));
    //     res.sendFile(path.join(__dirname,'../hi.pdf'),null,(err)=>
    //     {
    //         if(err)
    //         {
    //             throw new Error("Idr Error");
    //         }else
    //         {
    //              //
    //         }
    //     })

    // } catch (error) 
    // {
    //       res.send({
    //           error
    //       });    
    // }
    

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