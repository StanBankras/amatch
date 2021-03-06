// Check if a user is logged in -- source: https://scotch.io/tutorials/route-middleware-to-check-if-a-user-is-authenticated-in-node-js
function isAuthenticated(req, res, next) {
  if (req.session.activeUser != undefined) return next();
  res.redirect('/');
}

module.exports = isAuthenticated;