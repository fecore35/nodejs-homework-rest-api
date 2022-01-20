import express from "express"
import logger from "morgan"
import cors from "cors"
import helmet from "helmet"

import contactsRouter from "./routes/api/contacts"
import authRouter from "./routes/api/auth"

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 5000 }))
app.use(express.static("public"))

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app
