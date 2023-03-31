import { Router } from "express";
import VideoController from "../controllers/index.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = Router();

// router.get("/video", (req, res) => {
//   res.send("video sent");
// });

router.get(
  "/video",
  rateLimiter,
  VideoController.validator,
  VideoController.getVideo
);

export default router;
