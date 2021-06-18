import { urlJoin } from "./utils";
import type { Request } from "./request";
import type { StatsOptions } from "./types";

class Stats {
	start: Date;
	end: Date;
	resolution: string;
	stats: any;

	constructor(data: StatsOptions) {
		this.start = new Date(data.start);
		this.end = new Date(data.end);
		this.resolution = data.resolution;
		this.stats = data.stats.map(function (stat: { time: string | Date }) {
			stat.time = new Date(stat.time);
			return stat;
		});
	}
}

class StatsClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	__parseStats(response: { body: StatsOptions }) {
		return new Stats(response.body);
	}

	async getDomain(domain: string, query: any) {
		let response = await this.request.get(
			urlJoin("/v3", domain, "stats/total"),
			query
		);
		return this.__parseStats(response);
	}

	async getAccount(query: any) {
		let response = await this.request.get("/v3/stats/total", query);
		return this.__parseStats(response);
	}
}

export { StatsClient };
