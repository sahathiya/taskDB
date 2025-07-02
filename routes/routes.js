const express=require('express')

const routes=express.Router()
const { getAllorders, getTotalSalesPerCustomer } =require ('../controllers/orderController')

routes.get('/orders',getAllorders)
.get('/sales',getTotalSalesPerCustomer)

module.exports=routes