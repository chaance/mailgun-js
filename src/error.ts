import type { APIErrorOptions } from "./types";

export default class APIError extends Error {
	status: number | string;
	override stack?: string;
	details: string;

	constructor({ status, statusText, message, body = {} }: APIErrorOptions) {
		const { message: bodyMessage, error } = body;
		super();
		// this.stack = null;
		this.status = status;
		this.message = message || error || statusText;
		this.details = bodyMessage;
	}
}
