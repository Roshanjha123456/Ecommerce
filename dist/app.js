import express from "express";
import userRouter from "./routes/user.js";
import { connected } from "./utilis/feature.js";
import { errorMiddleware } from "./middleware/error/error.js";
import productRouter from "./routes/product.js";
const app = express();
const port = 4000;
connected();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("roshan is the boy");
});
app.use("/api/v1", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
});
