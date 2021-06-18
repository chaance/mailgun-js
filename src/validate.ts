import type { Request } from "./request";

class ValidateClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	async get(address: string) {
		const response = await this.request.get("/v3/address/validate", {
			address,
		});
		return response.body;
	}
}

export { ValidateClient };
