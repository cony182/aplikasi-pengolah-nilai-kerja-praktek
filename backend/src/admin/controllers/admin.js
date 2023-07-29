const User = require("../../models/user-model");

exports.admins = async (req, res) => {
   try {
      const user = await User.findAll({
         attributes: ["id", "nickname", "fullname", "role", "email", "picture", "createdAt"],
         where: { role: "admin" },
         order: [["id", "DESC"]],
      });

      res.status(200).json(user);
   } catch (error) {
      console.log(error);
   }
};
