const mongoose = require("mongoose")
const shortId = require("shortid")

const ShortUrlSchema = new mongoose.Schema({
	fullUrl: {
		type: String,
		required: true,
		match: [
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
			"Please enter valid URL",
		],
	},
	shortUrl: {
		type: String,
		required: true,
		default: shortId.generate,
	},
	clicks: {
		type: Number,
		required: true,
		default: 0,
	},
})

module.exports = mongoose.model("Short-URL", ShortUrlSchema)
