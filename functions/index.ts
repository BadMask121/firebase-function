// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from "firebase-functions";
import admin from "firebase-admin";
import firebase from "firebase";
import { config } from "./src/helpers/constants/App.constant";
const { FIREBASE } = config;

try {
	// admin.initializeApp(functions.config().firebase);
	firebase.initializeApp(FIREBASE);
	admin.initializeApp();
} catch (e) {
	console.log("whoops! there's been an error", e);
}

/**
 * this exports the our file to be developer friendly ,
 * only files with *.f.js except index.f.js will be deployed
 * to firebase
 * **/

("use strict");
import * as glob from "glob";
import camelCase from "camelcase";
const files = glob.sync("./**/*.f.js", {
	cwd: __dirname,
	ignore: "./node_modules/**",
});

for (let f = 0, fl = files.length; f < fl; f++) {
	const file = files[f];
	const functionName = camelCase(
		file
			.slice(9, -5)
			.split("/")
			.join("")
			.replace(/[index\.]+/g, ""),
	); // Strip off '.f.js'
	if (
		!process.env.FUNCTION_NAME ||
		process.env.FUNCTION_NAME === functionName
	) {
		exports[functionName] = require(file);
	}
}
