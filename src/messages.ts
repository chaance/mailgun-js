import type { Request } from "./request";
import type { CreateOptions } from "./types";

class MessagesClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	__parseResponse(response: { body: any }) {
		if (response.body) {
			return response.body;
		}
		return response;
	}

	async create(domain: string, data: CreateOptions) {
		if (data.message) {
			const response = await this.request.postMulti(
				`/v3/${domain}/messages.mime`,
				data
			);
			return this.__parseResponse(response);
		}

		const response = await this.request.postMulti(
			`/v3/${domain}/messages`,
			data
		);
		return this.__parseResponse(response);
	}
}

export { MessagesClient };
