const express = require('express');
const app = express();

const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use(helmet());
app.use(hpp());

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again later',
  });


  
app.use(limiter);

app.use('/user', userRoutes);
app.use('/auth', authRoutes);



  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
