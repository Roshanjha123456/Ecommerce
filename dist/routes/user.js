import express from "express";
import { newUser, getAllUsers, getUser, deleteUser } from "../controllers/user.js";
import { adminOnly } from "../middleware/auth/adminOnly.js";
const router = express.Router();
router.post("/newUser", newUser);
router.get("/getAllUsers", adminOnly, getAllUsers);
router.get("/getUser/:id", adminOnly, getUser);
router.delete("/deleteUser/:id", deleteUser);
export default router;
