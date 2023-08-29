function addCsrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); //generating the csrf token
  next();
}

module.exports = addCsrfToken;
