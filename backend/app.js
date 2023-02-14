require('dotenv').config();
require('express-async-errors'); //instead of using unnecessary try and catch blocks
const express = require('express');
const cors = require('cors')
const app = express();

const authRouter = require('./routes/authRoute')
const employeeRouter = require('./routes/employeeRoute')
const materialRouter = require('./routes/materialRoute')
const productRouter = require('./routes/productRoute')
const productionProcessRouter = require('./routes/productionProcessRoute')
const supplierRouter = require('./routes/supplierRoute')

const authMiddleware = require('./middleware/authentication')


//connectDB
const connect = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
app.use(cors({
  origin: "*",
  methods: '*',
  allowedHeaders: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}));

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/employees',authMiddleware, employeeRouter)
app.use('/api/v1/materials',authMiddleware , materialRouter)
app.use('/api/v1/products', authMiddleware , productRouter)
app.use('/api/v1/productionProcesses', authMiddleware, productionProcessRouter)
app.use('/api/v1/suppliers', authMiddleware, supplierRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();