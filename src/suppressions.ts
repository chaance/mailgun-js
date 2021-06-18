import url from "url";
import { urlJoin } from "./utils";

import type { Request } from "./request";
import type { BounceData, ComplaintData, UnsubscribeData } from "./types";

interface ParsedPage {
	id: string;
	page: string | string[] | undefined;
	address: string | string[] | undefined;
	url: string;
}

interface ParsedEventList {
	items: any;
	pages: Record<string, ParsedPage>;
}

type ModelType = typeof Bounce | typeof Complaint | typeof Unsubscribe;

const createOptions = {
	headers: { "Content-Type": "application/json" },
};

class Bounce {
	type: string;
	address: string;
	code: number;
	error: string;
	createdAt: Date;

	constructor(data: BounceData) {
		this.type = "bounces";
		this.address = data.address;
		this.code = +data.code;
		this.error = data.error;
		this.createdAt = new Date(data.created_at);
	}
}

class Complaint {
	type: string;
	address: any;
	createdAt: Date;

	constructor(data: ComplaintData) {
		this.type = "complaints";
		this.address = data.address;
		this.createdAt = new Date(data.created_at);
	}
}

class Unsubscribe {
	type: string;
	address: string;
	tags: any;
	createdAt: Date;

	constructor(data: UnsubscribeData) {
		this.type = "unsubscribes";
		this.address = data.address;
		this.tags = data.tags;
		this.createdAt = new Date(data.created_at);
	}
}

class SuppressionClient {
	request: Request;
	models: {
		bounces: typeof Bounce;
		complaints: typeof Complaint;
		unsubscribes: typeof Unsubscribe;
	};

	constructor(request: Request) {
		this.request = request;
		this.models = {
			bounces: Bounce,
			complaints: Complaint,
			unsubscribes: Unsubscribe,
		};
	}

	__parsePage(id: string, pageUrl: string): ParsedPage {
		const parsedUrl = url.parse(pageUrl, true);
		const { query } = parsedUrl;

		return {
			id,
			page: query.page,
			address: query.address,
			url: pageUrl,
		};
	}

	__parsePageLinks(response: {
		body: { paging: any };
	}): Record<string, ParsedPage> {
		const pages = Object.entries(response.body.paging);
		return pages.reduce<Record<string, ParsedPage>>((acc, [id, url]) => {
			acc[id] = this.__parsePage(id, url as string);
			return acc;
		}, {});
	}

	__parseList(
		response: { body: { items: any; paging: any } },
		Model: ModelType
	): ParsedEventList {
		let data = {} as ParsedEventList;
		data.items = response.body.items.map((d: any) => new Model(d));
		data.pages = this.__parsePageLinks(response);
		return data;
	}

	__parseItem(response: { body: any }, Model: ModelType) {
		return new Model(response.body);
	}

	async list(domain: string, type: string, query: any) {
		const model = (this.models as any)[type];

		const response = await this.request.get(urlJoin("v3", domain, type), query);
		return this.__parseList(response, model);
	}

	async get(domain: string, type: string, address: string) {
		const model = (this.models as any)[type];

		const response = await this.request.get(
			urlJoin("v3", domain, type, encodeURIComponent(address))
		);
		return this.__parseItem(response, model);
	}

	async create(domain: string, type: string, data: any) {
		// supports adding multiple suppressions by default
		if (!Array.isArray(data)) {
			data = [data];
		}

		const response = await this.request.post(
			urlJoin("v3", domain, type),
			data,
			createOptions
		);
		return response.body;
	}

	async destroy(domain: string, type: string, address: string) {
		const response = await this.request.delete(
			urlJoin("v3", domain, type, encodeURIComponent(address))
		);
		return response.body;
	}
}

export { SuppressionClient };
