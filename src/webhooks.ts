import { urlJoin } from "./utils";
import type { Request } from "./request";

class Webhook {
	id: string;
	url: string;

	constructor(id: string, data: { url: string }) {
		this.id = id;
		this.url = data.url;
	}
}

class WebhookClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	__parseWebhookList(response: { body: { webhooks: any } }) {
		return response.body.webhooks;
	}

	__parseWebhookWithID(id: string) {
		return function (response: { body: { webhook: any } }) {
			return new Webhook(id, response.body.webhook);
		};
	}

	__parseWebhookTest(response: { body: { code: number; message: string } }) {
		return { code: response.body.code, message: response.body.message };
	}

	async list(domain: string, query: any) {
		const response = await this.request.get(
			urlJoin("/v2/domains", domain, "webhooks"),
			query
		);
		return this.__parseWebhookList(response);
	}

	async get(domain: string, id: string): Promise<Webhook> {
		return this.request
			.get(urlJoin("/v2/domains", domain, "webhooks", id))
			.then(this.__parseWebhookWithID(id));
	}

	async create(domain: string, id: string, url: string, test: boolean) {
		if (test) {
			const response = await this.request.put(
				urlJoin("/v2/domains", domain, "webhooks", id, "test"),
				{ url }
			);
			return this.__parseWebhookTest(response);
		}

		return this.request
			.post(urlJoin("/v2/domains", domain, "webhooks"), { id, url })
			.then(this.__parseWebhookWithID(id));
	}

	async update(domain: string, id: string, url: string): Promise<Webhook> {
		return this.request
			.put(urlJoin("/v2/domains", domain, "webhooks", id), { url })
			.then(this.__parseWebhookWithID(id));
	}

	async destroy(domain: string, id: string): Promise<Webhook> {
		return this.request
			.delete(urlJoin("/v2/domains", domain, "webhooks", id))
			.then(this.__parseWebhookWithID(id));
	}
}

export { WebhookClient };
