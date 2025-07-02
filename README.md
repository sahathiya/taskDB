# 📘 Database Fundamentals Project

A backend project that demonstrates core database concepts using **PostgreSQL**, **Prisma ORM**, and **Node.js (Express)**. It includes master and transaction tables, SQL querying, reporting .

---

## ✅ Features

### 📌 Schema Design
1. **Master Tables**
   - `Customer`: Stores customer details with constraints (`UNIQUE`, `NOT NULL`)
   - `Product`: Stores product data including price and stock levels

2. **Transaction Tables**
   - `Order`: Links customers and products, includes `orderDate`, `status`, and `totalAmount`

3. **Data Types & Constraints**
   - Used appropriate types: `String`, `Int`, `DateTime`
   - Added constraints like `@unique`, `@default`, and foreign key relationships

---
git clone <repo-url>
npm install

Prisma Migration=>
npx prisma generate
npx prisma migrate dev

Start Server
npm start
