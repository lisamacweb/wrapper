const getUsersController = async (req, res) => {
  try {
    // throw new Error("Error");
    setTimeout(() => {
      return res.status(200).send({
        success: true,
        usersArray: [
          { name: "jack", age: "60" },
          { name: "mari", age: "25" },
        ],
      });
    }, 600);
  } catch (error) {
    res.status(400).json({ status: 400, succes: false });
  }
};

export { getUsersController };
