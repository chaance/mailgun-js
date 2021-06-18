import { Client } from "./client";
import type { Options } from "./types";
import type NodeFormData from "form-data";

class Mailgun {
	private formData: new () => FormData | NodeFormData;

	constructor(FormData: new (...args: any[]) => FormData | NodeFormData) {
		this.formData = FormData;
	}

	client(options: Options) {
		return new Client(options, this.formData);
	}
}

export { Mailgun };
export * from "./types";
