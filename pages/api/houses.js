import nc from "next-connect";
import { getHousesController } from "../../controllers/getHouses";

const handler = nc({
  // onError,
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.get(getHousesController);

export default handler;
