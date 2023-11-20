const jwt = require('jwt-simple');
const mysql = require('mysql');
const bcrypt=require('bcrypt');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'testSecure',
});

const JWT_SECRET = 'ashdhadaksjghdkjglaskdgljg';

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
  
    const query = `SELECT * FROM users WHERE username='${username}'`;
    pool.query(query, async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to authenticate user' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const user = results[0];
  
      // Compare hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.encode({ username }, JWT_SECRET);
      res.json({ token });
    });
  };

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
};

exports.protectedRoute = (req, res) => {
  res.json({ message: 'This is a protected route', user: req.decoded });
};
