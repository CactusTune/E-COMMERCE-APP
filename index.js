const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')


dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true ,useUnifiedTopology: true}
    ).then(
    ()=> console.log("Database Conected Successfully!")).catch((err)=>{
        console.log(err);
})

app.use(
    express.urlencoded({ extended: true })
);

app.use(cors())

app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)


app.get("/", (request, response) => {
    response.status(200).json({
      status: "success",
      message: "welcome to my e-commerce API",
    });
  });

app.listen(process.env.PORT || 3005, ()=>{
    console.log("Backend Server is Running on localhost://3005")
})

