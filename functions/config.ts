export {};

import * as request from "firebase-functions";
import admin from "firebase-admin";
import * as dotenv from "dotenv";
import axios from "axios";
import hash from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "firebase/app";
import * as _ from "lodash";

import express from "express";
import cors from "cors";
import bodyparser, { json, urlencoded } from "body-parser";

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(json());
app.use(urlencoded({ parameterLimit: 30 }));

dotenv.config();

const instance = axios.create({
	baseURL: `${process.env.SERVER_IP}/${process.env.API_BASE}`,
});
const connector = admin.firestore();

const host = process.env.SERVER_IP;
const baseRoute = process.env.API_BASE;
const deliveryWeeks = process.env.WEEKS_TO_DELIVERY;
const secret = process.env.API_SECRET;

export {
	host,
	baseRoute,
	deliveryWeeks,
	instance,
	secret,
	connector,
	request,
	hash,
	jwt,
	auth,
	app,
	_,
};
