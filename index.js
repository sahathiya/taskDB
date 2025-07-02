const express=require('express')
const dotenv=require('dotenv')
const prisma=require('./db/prisma')
const routes=require('./routes/routes')
dotenv.config()
const app=express()
const PORT=process.env.PORT||5000
app.use('/api',routes)
// app.get(`/`,async(req,res)=>{
//     const customers=await prisma.customer.findMany()
//     res.json(customers)
// })
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})