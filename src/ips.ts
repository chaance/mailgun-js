import type { Request } from "./request";
import type { IpData, IpsListResponseBody } from "./types";

class IpsClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	async list(query: any) {
		const response = await this.request.get("/v3/ips", query);
		return this.parseIpsResponse(response);
	}

	async get(ip: string) {
		const response = await this.request.get(`/v3/ips/${ip}`);
		return this.parseIpsResponse(response);
	}

	private parseIpsResponse(response: { body: IpsListResponseBody | IpData }) {
		return response.body;
	}
}

export { IpsClient };
