const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema({
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: [3, "Firstname must be at least 3 characters long"],
		},
		lastname: {
			type: String,
			minlength: [3, "Lastname must be at least 3 characters long"],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email"],
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	socketId: {
		type: String,
	},
	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "active",
	},
	vehicle: {
		color: {
			type: String,
			required: true,
			minlength: [3, "color must be at least 3 characters long"],
		},
		plate: {
			type: String,
			required: true,
			minlength: [3, "plate must be at least 3 characters long"],
		},
		capacity: {
			type: Number,
			required: true,
			min: [1, "capacity must be at least 1"],
		},
		vehicleType: {
			type: String,
			required: true,
			enum: ["car", "motorcycle", "auto", "van"],
		},
	},
	location: {
		lat: {
			type: Number,
		},
		length: {
			type: Number,
		},
	},
});

captainSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});
	return token;
};

captainSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
