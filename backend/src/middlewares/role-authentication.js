const authentication = (req, res, next) => {
   if (req.user.role == "guru" || req.user.role == "siswa") next();
   req.user = "Authorization failure";
   next();
};

module.exports = authentication;
