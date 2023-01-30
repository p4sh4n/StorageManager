require('dotenv').config();
require('express-async-errors'); //instead of using unnecessary try and catch blocks
const express = require('express');
const cors = require('cors')
const app = express();

const authRouter = require('./routes/authRoute')
const employeeRouter = require('./routes/employeeRouter')
const materialRouter = require('./routes/materialRouter')
const materialRouter = require('./routes/productRouter')
const productionProcessRouter = require('./routes/productionProcessRouter')
const supplierRouter = require('./routes/supplierRouter')

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
app.use('/api/v1/employees', authMiddleware, employeeRouter)
app.use('/api/v1/materials', authMiddleware, materialRouter)
app.use('/api/v1/products', authMiddleware, materialRouter)
app.use('/api/v1/productionProcesses', authMiddleware, productionProcessRouter)
app.use('/api/v1/suppliers', authMiddleware, supplierRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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