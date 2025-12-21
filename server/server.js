import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkWebHook, stripeWebhooks } from "./controller/webhooks.js";
import educatorRouter from "./routes/educatorRoute.js";
import { clerkMiddleware } from "@clerk/express";
import configureCloudinary from "./config/cloudinary.js";
import courseRouter from "./routes/CourseRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

await connectDB();
await configureCloudinary();

app.get("/", (req, res) => {
  return res.send("Working");
});
app.post("/clerk", clerkWebHook);
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
