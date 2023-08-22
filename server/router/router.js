import express from "express";
const router = express.Router();
import {getParticularDetails, getTrainDetails} from "../controllers/controller.js";
router.get("/getDetails", getTrainDetails);
router.get("/train",getParticularDetails);
export default router;