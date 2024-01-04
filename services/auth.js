const { users } = require('../utils/users')

exports.authenticateUser = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    return user !== undefined;
};