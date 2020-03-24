// import { request } from "../../config";
import * as functions from "firebase-functions";
import * as services from "../../services";
import { app } from "../../../config";
import { FORGOT_PASSWORD } from "./../../helpers/screen";

const { Authentication } = services;

app.post(FORGOT_PASSWORD, Authentication.forgotPassword);

const Auth = functions.https.onRequest(app);
module.exports = Auth;
