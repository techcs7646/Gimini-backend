express = require('express')
const router = require('./routes'); 
const app = express()
const port = 3000
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
app.use(
  cors({
      origin: "http://localhost:5173", 
      credentials: true, 
  })
);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => { 
    console.log('Failed to connect to MongoDB', err)
})

app.use(express.json());
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});