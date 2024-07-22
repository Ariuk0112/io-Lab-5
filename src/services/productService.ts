import prisma from "src/database";

class ProductService {
  async createProduct(body: any) {
    const newProduct = await prisma.product.create({ data: body });
    return newProduct;
  }

  async getProductList() {
    const productList = await prisma.product.findMany();
    return productList;
  }

  async getProductDetail(id: string) {
    const productDetail = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return productDetail;
  }

  async isProductExists(id: string) {
    const productDetail = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productDetail) {
      return false;
    }
    return true;
  }

  async deleteProduct(id: string) {
    const productDetail = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    return productDetail;
  }
}

export default ProductService;
