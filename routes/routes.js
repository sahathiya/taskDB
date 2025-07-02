const express=require('express')

const routes=express.Router()
const { getAllorders, getTotalSalesPerCustomer, getByDateRangeAndStatus, getDailySales } =require ('../controllers/orderController')

routes.get('/orders',getAllorders)
.get('/sales',getTotalSalesPerCustomer)
.get('/filter',getByDateRangeAndStatus)
.get('/daily',getDailySales)

module.exports=routes