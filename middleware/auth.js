// Hardcoded token for simplicity
const TOKEN = "mysecrettoken"; 

// Middleware to check for token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is present and correct
  if (token && token === `Bearer ${TOKEN}`) {
    return next(); // Proceed to the next middleware or route handler
  }

  return res.status(401).json({ error: "Unauthorized" });
};

module.exports = authenticateToken;
