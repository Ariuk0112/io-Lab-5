import prisma from "src/database";

class AuthenticationService {
  async createAccount(body: any) {
    const newUser = await prisma.user.create({ data: body });
    return newUser;
  }

  async getUserList() {
    const userList = await prisma.user.findMany({
      select: {
        username: true,
        firstname: true,
      },
    });
    return userList;
  }
  async getProductDetail(id: number) {
    const productDetail = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!productDetail) {
      return false;
    }
    return productDetail;
  }
}
export default AuthenticationService;
