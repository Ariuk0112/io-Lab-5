import prisma from "../../database";
import { Request, Response } from "express";
import { decrypt, encrypt } from "../../utils/encryption";
import { generateAccessToken } from "../../middleware/tokenHandler";
import { LoginRequestBody } from "authTypes";
import AuthenticationService from "src/services/authService";
import { JwtPayload } from "jsonwebtoken";
const authService = new AuthenticationService();
export const login = async (
  req: Request<any, any, LoginRequestBody>,
  res: Response
) => {
  let accessToken;
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "username or password cannot be empty",
      });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!userExists)
      return res.status(400).json({
        success: false,
        message: `${username} not exists in db`,
      });
    let selectedPassword = decrypt(userExists.password);
    if (password !== selectedPassword) {
      return res.status(400).json({
        success: false,
        message: "passwords not matching",
      });
    }
    console.log(`login successfull for ${username}`);
    accessToken = generateAccessToken(
      userExists,
      process.env.ACCESS_TOKEN_KEY as string,
      "69m"
    );
    return res.status(200).json({
      success: true,
      message: "login success",
      accessToken,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};

export const getUserList = async (req: Request, res: Response) => {
  try {
    const { role, username } = req.data as JwtPayload;
    if (role === "customer") {
      return res.json({
        success: false,
        message: "hereglegchiin erh hurehgui baina",
      });
    }
    const returnData = await authService.getUserList();

    if (returnData.length === 0)
      return res.status(400).json({
        success: false,
        message: "no data avalaible",
      });

    return res.status(200).json({
      success: true,
      data: returnData,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const returnData = await prisma.user.findMany();
    if (returnData.length === 0)
      return res.status(400).json({
        success: false,
        message: "no data avalaible",
      });

    return res.status(200).json({
      success: true,
      data: returnData,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { role } = req.data as JwtPayload;

    let { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "username or password null",
      });
    password = encrypt(password);
    const createdUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    console.log(`account successfully created for ${username}`);
    return res.status(200).json({
      success: true,
      data: createdUser.username,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};
