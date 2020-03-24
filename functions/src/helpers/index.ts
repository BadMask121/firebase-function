import { hash, jwt, _, secret } from "../../config";
import { config } from "../helpers/constants/App.constant";
const {
	NullException,
	ErrorHandler,
	InvalidException,
} = require("./error/errorHandler");

const { HASH_STRENGTH } = config;
// password salting
async function saltPassword(pass) {
	if (!validatePassword(pass))
		throw new ErrorHandler({
			info: "Password not strong enough for hashing",
		});

	const password = await hash.hash(pass, HASH_STRENGTH);
	if (password === null || typeof password === "undefined")
		throw new NullException({
			info: "Password hashing unsuccessful",
		});

	return password;
}

// returns a new Title case string
const convertToTitleCase = aString => {
	let splitStr = aString.toLowerCase().split(" ");
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}

	return splitStr.join(" ");
};

// deep trims an object
const deepTrim = values => {
	Object.keys(values).map(
		k =>
			(values[k] =
				typeof values[k] === "string"
					? values[k].trim()
					: typeof values[k] === "object"
					? deepTrim(values[k])
					: values[k]),
	);
	return values;
};

const getMissingFields = (model, data) => {
	if (data.length === 0)
		return {
			missingFields: 0,
			fields: 0,
		};

	const missingFields = _.differenceWith(model, [data], (modelData, req) =>
		req.hasOwnProperty(modelData),
	);
	return {
		missingFields: missingFields.length,
		fields: JSON.stringify(_.toPlainObject(missingFields)),
	};
};
// helper function for validating emails
function validateEmail(email) {
	// let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (
		email.length <= 0 ||
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
			String(email).toLowerCase(),
		)
	)
		return false;
	return true;
}

/**
 * password validation
 * @param {*} password
 */
function validatePassword(password) {
	// eslint-disable-next-line no-magic-numbers
	if (password.length < 7) return false;

	const passwordTestRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,}$/;
	if (!passwordTestRegex.test(String(password))) return false;

	return true;
}

// verify encrptyed password
async function verifyPassword(password, comparePassword) {
	const verifiedPassword = await hash.compare(password, comparePassword);
	if (verifiedPassword) return true;

	return false;
}

// encode String to base64
const toBase64 = message => {
	return message && Buffer.from(message).toString("base64");
};

// decode base64 to String
const fromBase64 = message => {
	return message && Buffer.from(message, "base64").toString("ascii");
};

// const mergeObjects = () => {
// 	let resultingObj = {};

// 	for (const idx in arguments) {
// 		const currObj = arguments[idx];

// 		for (const key in currObj) {
// 			if (currObj.hasOwnProperty(key)) {
// 				const element = currObj[key];
// 				resultingObj[key] = element;
// 			}
// 		}
// 	}

// 	return resultingObj;
// };

// a helper function to generateToken into database
// eslint-disable-next-line require-await
async function generateToken(args, expire) {
	// if token expiration date is not defined then set default expiration to 24hours
	if (typeof expire === "undefined") expire = "30d";

	const token = jwt.sign(args, secret, {
		expiresIn: expire,
	});
	if (!token)
		throw new InvalidException({
			info: `Token generated but not Inserted`,
		});

	return token;
}

/**
 * verifify and return token data
 * @param {*} token
 */
function verifyToken(token) {
	const tokenData = jwt.verify(token, secret);
	if (!tokenData)
		throw new InvalidException({
			info: `Invalid authorization token`,
		});

	return tokenData;
}

module.exports = {
	generateToken,
	verifyToken,
	convertToTitleCase,
	deepTrim,
	getMissingFields,
	saltPassword,
	validateEmail,
	validatePassword,
	verifyPassword,
	toBase64,
	fromBase64,
};
