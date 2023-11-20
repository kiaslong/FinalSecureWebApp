const mysql = require('mysql');
const bcrypt=require('bcrypt');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testSecure',
});
let count = 0; 

exports.registerUser = (req, res) => {
    const { username, password } = req.body;
  
    // Hash password using bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to register user' });
      }
  
      const query = `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}')`;
      pool.query(query, (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Failed to register user' });
        }
        res.json({ message: 'User registered successfully' });
      });
    });
  };

  exports.getUserByUsername = (req, res) => {
    const username = req.query.username;
  
    const query = 'SELECT * FROM users WHERE username = ?';
  
    count++; // Increment the count every time the function is called
    console.log('Function executed count:', count);
  
    pool.query(query, [username], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve user data' });
      }
      res.json(results);
    });
  };
