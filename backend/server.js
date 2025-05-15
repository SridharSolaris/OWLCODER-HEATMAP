import express from "express";
import api from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import LoginRouter from "./routes/loginrouter.js";
import DetailsRouter from "./routes/detailsrouter.js";
dotenv.config();
mongoose.connect(
  process.env.MONGODB_PATH,
  () => {
    console.log("connect");
  },
  (e) => console.log(e)
);

const PORT = process.env.SERVER_PORT || 9000;
const origin = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(api);

app.listen(PORT, () => {
  console.log(`Your app is running in http://localhost:${PORT}`);
});
// app.post('/adddata', async (req, res) => {
//     try {
//         console.log(req.body.formdata);
//         const { name, no,floor,campus} = req.body.formdata;
//         const dt = new block({
//             roll,
//             password
//         });
//         await dt.save();
//         return res.status(200).json({ "result": dt });
//     } catch (err) {
//         // console.error(err);
//         return res.status(500).json({ error: "An error occurred while saving data" });
//     }
// });

app.use("/", LoginRouter);

app.use("/", DetailsRouter);

app.get("/testing", (req, res, next) => {
  res.send("hello world");
});
