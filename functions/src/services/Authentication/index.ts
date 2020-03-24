import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { Request, Response } from "express";

class Authentication {
	constructor() {}

	forgotPassword = (req: Request<any>, res: Response<any>) => {
		return res.send("Hello world");
	};
}
export default Authentication;
