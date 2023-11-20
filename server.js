const express = require('express')
const app = express();

app.get('/aa',(req,res)=>{
    res.send({name:'zhangsan'});
})


const port = process.env.PORT || 3334;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})