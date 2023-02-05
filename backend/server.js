//DIT-FT-1B09
//2227861
//Timothy Chia 
const app = require('./controller/app.js');
const router = require("./controller/router.js");
const port = 3000

app.use("/auth", router);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})  