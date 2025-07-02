const prisma=require('../db/prisma')

const getAllorders=async(req,res)=>{
const orders=await prisma.order.findMany({
     orderBy: {
    orderDate: 'desc'
  },
  include: {
    customer: true,
    product: true
  }
})
res.json(orders)


}


const getTotalSalesPerCustomer=async(req,res)=>{
    const sales = await prisma.order.groupBy({
      by: ['customerId'],
      _sum: {
        totalAmount: true
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc'
        }
      }
    });

    // Fetch customer names for mapping
    const customerIds = sales.map(s => s.customerId);
    const customers = await prisma.customer.findMany({
      where: {
        id: { in: customerIds }
      }
    });

    // Combine data
    const result = sales.map(sale => {
      const customer = customers.find(c => c.id === sale.customerId);
      return {
        customerId: sale.customerId,
        customerName: customer?.name || 'Unknown',
        totalSales: sale._sum.totalAmount
      };
    });

    res.json(result);

}




const getByDateRangeAndStatus=async(req,res)=>{

    const{from,to,status}=req.query


    const filteredSales = await prisma.order.groupBy({
      by: ['customerId'],
      where: {
        orderDate: {
          gte: new Date(from),
          lte: new Date(to)
        },
        status: status
      },
      _sum: {
        totalAmount: true
      },
      orderBy: {
        _sum: {
          totalAmount: 'desc'
        }
      }
    });

    // Fetch related customer names
    const customerIds = filteredSales.map(s => s.customerId);
    const customers = await prisma.customer.findMany({
      where: {
        id: { in: customerIds }
      }
    });

    // Combine with customer data
    const result = filteredSales.map(sale => {
      const customer = customers.find(c => c.id === sale.customerId);
      return {
        customerId: sale.customerId,
        customerName: customer?.name || 'Unknown',
        totalSales: sale._sum.totalAmount
      };
    });

    res.json(result);

}


const getDailySales=async(req,res)=>{
   const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start from 0
const dd = String(today.getDate()).padStart(2, '0');

// Format: YYYY-MM-DD
const todayDate = `${yyyy}-${mm}-${dd}`;

console.log("todayDate",todayDate);
const sales = await prisma.order.groupBy({
      by: ['orderDate'],
      where: {
        orderDate:todayDate
      },
      _sum: {
        totalAmount: true
      }
    });

    res.json(sales)



}
module.exports={getAllorders,getTotalSalesPerCustomer,getByDateRangeAndStatus,getDailySales}