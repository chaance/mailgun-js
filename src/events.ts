import { urlJoin } from "./utils";
import type { Request as MgRequest } from "./request";

interface ParsedPage {
	id: string;
	number: string | undefined;
	url: string;
}

interface ParsedEventList {
	items: any;
	pages: Record<string, ParsedPage>;
}

export class EventClient {
	request: MgRequest;

	constructor(request: MgRequest) {
		this.request = request;
	}

	__parsePageNumber(url: string): string | undefined {
		return url.split("/").pop();
	}

	__parsePage(id: string, url: string): ParsedPage {
		return {
			id,
			number: this.__parsePageNumber(url),
			url,
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

	__parseEventList(response: {
		body: { items: any; paging: any };
	}): ParsedEventList {
		return {
			items: response.body.items,
			pages: this.__parsePageLinks(response),
		};
	}

	async get(domain: string, query: { page: any }): Promise<ParsedEventList> {
		let url;

		if (query && query.page) {
			url = urlJoin("/v2", domain, "events", query.page);
			delete query.page;
		} else {
			url = urlJoin("/v2", domain, "events");
		}

		const response = await this.request.get(url, query);
		return this.__parseEventList(response);
	}
}
