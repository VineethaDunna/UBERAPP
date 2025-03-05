const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { selectFields } = require("express-validator/lib/field-selection");
const userSchema = new mongoose.Schema({
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: [3, "First name must be at least 3"],
		},
		lastname: {
			type: String,
			minlength: [3, "Last name must be at least 3 characters long"],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: [5, "email must be at least 5 characters long and contains @"],
	},
	password: {
		type: String,
		required: true,
		minlength: [5, "email must be at least 5 characters long and contains @"],
		select: false,
	},
	socketId: {
		type: String,
	},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});
	return token;
};

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
