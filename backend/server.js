import express from "express"
import dotenv from "dotenv"
import path from "path"

import {connectDB} from "./config/db"

import product from "./routes/product.route"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())

app.use("/api/products", product)

if(process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname, "/frontend/dist")))
     app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
     })
}

app.listen(PORT, () => {
    connectDB()
    console.log("Server running on port " + PORT)
})