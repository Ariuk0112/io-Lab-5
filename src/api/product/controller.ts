import { Request, Response } from "express";
import ProductService from "src/services/productService";
const productService = new ProductService();

export const getProductList = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProductList();
    if (result.length === 0)
      return res.status(400).json({
        success: false,
        message: "no data avalaible",
      });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    let result = await productService.createProduct(body);
    return res.status(200).json({
      success: true,
      message: `Амжилттай үүсгэлээ. Бүтээгдэхүүний дугаар : ${result.id}`,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productExists = await productService.isProductExists(id);
    if (!productExists) {
      return res.json({
        success: false,
        message: "product not exists ",
      });
    }
    const result = await productService.getProductDetail(id);
    if (!result)
      return res.status(400).json({
        success: false,
        message: "no data avalaible",
      });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productExists = await productService.isProductExists(id);
    if (!productExists) {
      return res.json({
        success: false,
        message: "product not exists ",
      });
    }
    const result = await productService.deleteProduct(id);
    return res.status(200).json({
      success: true,
      data: result.name,
    });
  } catch (error) {
    console.error("An error occurred during check:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred during check" });
  }
};
