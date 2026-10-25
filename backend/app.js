import express from  "express";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
const app = express();

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/notes", noteRoutes)

app.post("/", (req, res) => {
   res.send("Home Page")
})


export default app;