//DIT-FT-1B09
//2227861
//Timothy Chia 
const app = require('./controller/app.js');
const port = 3000

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})  