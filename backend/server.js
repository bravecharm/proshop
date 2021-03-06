import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

// Add the middleware for morgan.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) //dev gives us the http method, status..
}
app.use(express.json()) //related to user authentication

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

// So when we're ready to make our payment, we'll hit this route and we'll fetch this client Id.

//make uploads folder static so we can access it

const __dirname = path.resolve() //to mimic _dirname in js.
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // pathjoin - to join different segments of files . dirname can only be used in common express, not available in es module so we need to mimic it by creating a variable name _dirname and use path resolve.
// it takes us to the uploads folder and making it static

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build'))) //to make the 'build' folder in frontend as our static folder in production

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  ) // any route thats not any of these ('/api) is going to point to this index.html in that static 'build' folder.
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
)
