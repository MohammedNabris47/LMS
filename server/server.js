import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkWebHook } from "./controller/webhooks.js";

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  return res.send("Working");
});
app.post("/clerk", clerkWebHook);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
