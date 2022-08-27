const { Schema } = require("mongoose");

export const placeSchema = new Schema({
	personInCharge: {
		type: String,
		trim: true,
		default: "",
	},

	email: { type: String, trim: true, require: true, unique: true },

	password: { type: String, require: true },

	hasSound: { type: Boolean, require: true, default: false },

	capacity: { type: String, trim: true, require: true, default: "" },

	name: { type: String, trim: true, require: true, default: "" },

	city: { type: String, trim: true, require: true, default: "" },

	adress: { type: String, trim: true, require: true, default: "" },

	rating: { type: Number, default: 0 },

	description: { type: String, trim: true, default: "" },

	banned: { type: Boolean, default: false },
	role: {
		type: String,
		default: "place",
	},

	reviews: [
		{
			author: { type: String, trim: true, require: false },
			comment: { type: String, trim: true, require: false },
			rating: Number,
		},
	],
	dates: [
		{
			date: { type: Date },
			musicBand: { type: String },
		},
	],
	availableDates: [
		{
			date: { type: Date },
			isAvailable: { type: Boolean },
		},
	],
	pendingDates: [
		{
			musicBand: { type: String },
			date: { type: Date, default: Date.now },
		},
	],
	socialMedia: {
		instagram: { type: String, trim: true, default: "" },
	},
	phoneNumber: { type: String, trim: true, default: "" },

	profilePicture: { type: String, require: false, default: "" },

	suscription: {
		isSuscribed: { type: Boolean, default: false },
		startDate: { type: Date, default: Date.now },
		payment_id: { type: String, default: "" },
	},
});

module.exports = placeSchema;
