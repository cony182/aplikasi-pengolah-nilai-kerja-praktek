const NIS = require("../../models/nis-model");

exports.nis = async (req, res) => {
   try {
      const nis = await NIS.findAll({
         attributes: ["id", "nis", "expires"],
         order: [["id", "DESC"]],
         limit: 5,
      });
      res.status(200).json(nis);
   } catch (error) {
      console.log(error);
   }
};

exports.create = async (req, res) => {
   try {
      const nisExist = await NIS.findOne({ where: { nis: req.body.nis } });
      if (nisExist) return res.status(400).json({ message: "NIS tidak tersedia" });

      await NIS.create({ nis: req.body.nis, expires: "valid" });
      res.send("from nis");
   } catch (error) {
      console.log(error);
   }
};
