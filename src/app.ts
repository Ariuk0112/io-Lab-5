import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import * as dotenv from "dotenv";
import createHttpError from "http-errors";
import swaggerSpec from "./utils/swaggerConfig";
import swaggerUi from "swagger-ui-express";
dotenv.config();
const app = express();

app.use(cors());
app.use(compression());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//main routes
app.use("/api/auth", require("./api/auth/router"));
app.use("/api/product", require("./api/product/router"));

//documentation routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let err_status = err.status || 500;
  console.error(
    new Date().toUTCString() + ` ${req.originalUrl} appException:`,
    err.message
  );
  // console.error(err.stack)

  return res.status(err_status).json({
    success: false,
    message: `${err_status} + ${err.message}`,
  });
});

process.on("SIGTERM", (signal) => {
  console.log(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(1);
});

process.on("SIGINT", (signal) => {
  console.log(`Process ${process.pid} has been interrupted`);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
});

process.on("unhandledRejection", (err: Error, promise) => {
  console.log("unhandledRejection at ", promise, `error: ${err.message}`);
});

app.listen(process.env.PORT || 3000, async () => {
  console.log(`server running on port ${process.env.PORT}`);
});

module.exports = app;
