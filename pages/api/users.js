import nc from "next-connect";
import { getUsersController } from "../../controllers/getUsers";

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

handler.get(getUsersController);

export default handler;
