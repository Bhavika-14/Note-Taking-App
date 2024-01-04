const { authenticateUser } = require('../services/auth')

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401).send('Unauthorized');
      return;
    }
  
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
  
    if (!authenticateUser(username, password)) {
      res.status(401).send('Unauthorized');
    } else {
      next();
    }
};

module.exports = authenticate