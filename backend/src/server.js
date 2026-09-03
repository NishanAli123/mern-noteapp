import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dns from "node:dns";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


dns.setServers(["8.8.8.8", "1.1.1.1"]);



//middleware
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(rateLimiter)


app.use("/api/notes",notesRoutes);


connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server started on port: ",5001);
});
})



