const Guru = require("../../models/guru-model");
const User = require("../../models/user-model");
const { Op } = require("sequelize");

exports.users = async (req, res) => {
   try {
      const limit = req.query.limit || 20;
      const lastId = req.query.lastId || 0;
      let users = [];
      if (lastId < 1) {
         const user = await User.findAll({
            attributes: ["id", "uid", "nickname", "isReguler", "fullname", "role", "email", "picture", "createdAt"],
            where: {
               [Op.or]: {
                  nickname: { [Op.like]: "%" + req.query.search + "%" },
                  fullname: { [Op.like]: "%" + req.query.search + "%" },
                  email: { [Op.like]: "%" + req.query.search + "%" },
               },
            },
            limit: 20,
            order: [["id", "DESC"]],
         });

         users = user;
      } else {
         const user = await User.findAll({
            attributes: ["id", "uid", "nickname", "isReguler", "fullname", "role", "email", "picture", "createdAt"],
            where: {
               id: { [Op.lt]: lastId },
               [Op.or]: {
                  nickname: { [Op.like]: "%" + req.query.search + "%" },
                  fullname: { [Op.like]: "%" + req.query.search + "%" },
                  email: { [Op.like]: "%" + req.query.search + "%" },
               },
            },
            limit: 20,
            order: [["id", "DESC"]],
         });

         users = user;
      }

      res.status(200).json({
         users: users,
         lastId: users.length ? users[users.length - 1].id : 0,
         hasMore: users.length >= limit ? true : false,
      });
   } catch (error) {
      console.log(error);
   }
};

exports.user = async (req, res) => {
   try {
      const user = await User.findOne({
         attributes: ["id", "uid", "nickname", "fullname", "role", "email", "picture", "createdAt"],
         where: { nickname: req.params.nickname },
      });
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
      res.status(200).json(user);
   } catch (error) {
      console.log(error);
   }
};

exports.update = async (req, res) => {
   try {
      if (req.body.role == "reguler") {
         await User.update({ role: req.body.role, isReguler: 1 }, { where: { uid: req.body.uid } });
         return res.status(200).json({ message: "Data berhasil di update" });
      }
      if (req.body.role == "guru") {
         const user = await User.findOne({ attributes: ["id", "nickname"], where: { uid: req.body.uid } });
         await Guru.create({ NIP: Date.now(), nama: user.nickname, userId: user.id });
      }
      await User.update({ role: req.body.role, isReguler: 0 }, { where: { uid: req.body.uid } });
      res.status(200).json({ message: "Data berhasil di update" });
   } catch (error) {
      console.log(error);
   }
};
