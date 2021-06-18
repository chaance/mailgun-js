import type { Request } from "./request";

class ParseClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	async get(addresses: string[] | string, enableDnsEspChecks: boolean) {
		let query = {} as { addresses: string; syntax_only: boolean };

		if (Array.isArray(addresses)) {
			addresses = addresses.join(",");
		}

		query.addresses = addresses;

		if (enableDnsEspChecks) {
			query.syntax_only = false;
		}

		const response = await this.request.get("/v3/address/parse", query);
		return response.body;
	}
}

export { ParseClient };
