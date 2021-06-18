import { Request } from "./request";
import { DomainClient } from "./domains";
import { EventClient } from "./events";
import { StatsClient } from "./stats";
import { SuppressionClient } from "./suppressions";
import { WebhookClient } from "./webhooks";
import { MessagesClient } from "./messages";
import { RoutesClient } from "./routes";
import { ValidateClient } from "./validate";
import { ParseClient } from "./parse";
import { IpsClient } from "./ips";
import { IpPoolsClient } from "./ip-pools";

import type NodeFormData from "form-data";
import type { RequestOptions, Options } from "./types";

class Client {
	private request;

	public domains;
	public webhooks;
	public events;
	public stats;
	public suppressions;
	public messages;
	public routes;
	public publicRequest;
	public validate;
	public parse;
	public ips;
	public ipPools;

	constructor(
		options: Options,
		formData: new (...args: any[]) => FormData | NodeFormData
	) {
		const config: RequestOptions = { ...options } as RequestOptions;

		if (!config.url) {
			config.url = "https://api.mailgun.net";
		}

		if (!config.username) {
			throw new Error('Parameter "username" is required');
		}

		if (!config.key) {
			throw new Error('Parameter "key" is required');
		}

		this.request = new Request(config, formData);
		this.domains = new DomainClient(this.request);
		this.webhooks = new WebhookClient(this.request);
		this.events = new EventClient(this.request);
		this.stats = new StatsClient(this.request);
		this.suppressions = new SuppressionClient(this.request);
		this.messages = new MessagesClient(this.request);
		this.routes = new RoutesClient(this.request);
		this.ips = new IpsClient(this.request);
		this.ipPools = new IpPoolsClient(this.request);

		if (config.publicKey) {
			config.key = config.publicKey;

			this.publicRequest = new Request(config, formData);
			this.validate = new ValidateClient(this.publicRequest);
			this.parse = new ParseClient(this.publicRequest);
		}
	}
}

export { Client };
