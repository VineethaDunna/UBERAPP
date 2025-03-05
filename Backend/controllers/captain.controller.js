const blacklistTokenModel = require("../models/blacklistToken.model");
const bcrypt = require("bcryptjs");

const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");
const captainServices = require("../services/captain.services");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password, fullname, vehicle } = req.body;

	const isUserAlready = await userModel.findOne({ email });

	if (isUserAlready) {
		return res.status(400).json({ errors: [{ msg: "User already exist" }] });
	}

	const isCaptainAlreadyExist = await captainModel.findOne({ email });
	if (isCaptainAlreadyExist) {
		return res.status(400).json({ errors: [{ msg: "Captain already exist" }] });
	}

	const hashedPassword = await captainModel.hashPassword(password);
	const captain = await captainServices.createCaptain({
		firstname: fullname.firstname,
		lastname: fullname.lastname,
		email,
		password: hashedPassword,
		color: vehicle.color,
		plate: vehicle.plate,
		capacity: vehicle.capacity,

		vehicleType: vehicle.vehicleType,
	});

	const token = captain.generateAuthToken();
	res.status(201).json({ captain, token });
};

module.exports.loginCaptain = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	const captain = await captainModel.findOne({ email }).select("password");

	if (!captain) {
		return res.status(404).json({ message: "Captain not found" });
	}
	const isMatch = await captain.comparePassword(password);
	if (!isMatch) {
		return res.status(401).json({ message: "Invalid Password" });
	}
	const token = captain.generateAuthToken();

	res.cookie("token", token);
	res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res) => {
	res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
	const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
	await blacklistTokenModel.create({ token });
	res.clearCookie("token");
	res.status(200).json({ message: "Logout successful" });
};
