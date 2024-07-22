import { Router } from "express";
import { createAccount, getUserList, login } from "./controller";
import { auth } from "../../middleware/tokenHandler";

const router = Router();

router.post("/createAccount",auth, createAccount);

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "test"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 success:
 *                   type: boolean
 *                   description: Success
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Response message
 *                   example: "login success"
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: "Username or password incorrect"
 *       500:
 *         description: Internal server error
 */

router.post("/", login);
router.get("/list", auth, getUserList);

module.exports = router;
