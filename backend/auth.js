// backend/middleware/auth.js
const supabase = require('./supabaseClient');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Missing token' });

    const { data, error } = await supabase.auth.getUser(token);
    console.log('Auth middleware - user data:', data);
    if (error || !data.user) return res.status(401).json({ error: 'Invalid token' });

    req.user = data.user; // Supabase user object
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticate;
