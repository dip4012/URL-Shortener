require("dotenv").config()
require("express-async-errors")

const connectDB = require("./db/connect")
const ShortUrl = require("./models/shortUrl")

const express = require("express")
const shortUrl = require("./models/shortUrl")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
	const shortUrls = await ShortUrl.find({})
	res.status(200).render("index", { shortUrl: shortUrls })
})

app.post("/api/v1/shortUrl", async (req, res) => {
	await ShortUrl.create({ fullUrl: req.body.fullUrl })
	res.redirect("/")
})

app.get("/:short", async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.short })
	if (!shortUrl) return res.status(404).send("Cannot find url")

	shortUrl.clicks++
	shortUrl.save()

	res.redirect(shortUrl.fullUrl)
})

const port = process.env.PORT || 8080

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server listening at port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
