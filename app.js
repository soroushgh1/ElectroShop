import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', AuthRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/category', CategoryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});