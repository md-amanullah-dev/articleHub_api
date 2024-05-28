const app = require('./app');

const PORT = process.env.PORT||500
app.listen(PORT,async(req,res)=>{
    console.log(`server running at ${PORT}`)
})