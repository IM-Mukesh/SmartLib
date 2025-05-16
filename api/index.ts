import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;
async function connectToMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI as string);
  isConnected = true;
}

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from SmartLib on Vercel!" });
});

export default async function handler(req: any, res: any) {
  await connectToMongo();
  return app(req, res);
}
