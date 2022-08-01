const getHousesController = async (req, res) => {
  try {
    //throw new Error("error");
    setTimeout(() => {
      if (req.query.type == "type1") return res.status(200).send({ success: true, houses_data: ["House1_type1", "House2_type1"] });
      else return res.status(200).send({ success: true, houses_data: ["House3_type2", "House4_type2", "House5_type2"] });
    }, 600);
  } catch (error) {
    res.status(400).json({ status: 400, succes: false });
  }
};

export { getHousesController };
