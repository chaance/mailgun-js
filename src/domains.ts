import { urlJoin } from "./utils";
import type { Request } from "./request";

interface DomainData {
	name: string;
	requireTls: any;
	skipVerification: any;
	state: any;
	wildcard: any;
	spamAction: any;
	createdAt: string | Date;
	smtpPassword: string;
	smtpLogin: string;
	type: string;
}

class Domain {
	name: any;
	requireTls: any;
	skipVerification: any;
	state: any;
	wildcard: any;
	spamAction: any;
	createdAt: any;
	smtpPassword: any;
	smtpLogin: any;
	type: any;
	receivingDnsRecords: any;
	sendingDnsRecords: any;

	constructor(data: DomainData, receiving?: any, sending?: any) {
		this.name = data.name;
		this.requireTls = data.requireTls;
		this.skipVerification = data.skipVerification;
		this.state = data.state;
		this.wildcard = data.wildcard;
		this.spamAction = data.spamAction;
		this.createdAt = data.createdAt;
		this.smtpPassword = data.smtpPassword;
		this.smtpLogin = data.smtpLogin;
		this.type = data.type;

		this.receivingDnsRecords = receiving || null;
		this.sendingDnsRecords = sending || null;
	}
}

class DomainClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	__parseMessage(response: { body: any }) {
		return response.body;
	}

	__parseDomainList(response: { body: { items: DomainData[] } }) {
		return response.body.items.map(function (item) {
			return new Domain(item);
		});
	}

	__parseDomain(response: {
		body: {
			domain: any;
			receivingDnsRecords: any;
			sendingDnsRecords: any;
		};
	}) {
		return new Domain(
			response.body.domain,
			response.body.receivingDnsRecords,
			response.body.sendingDnsRecords
		);
	}

	__parseTrackingSettings(response: { body: { tracking: any } }) {
		return response.body.tracking;
	}

	__parseTrackingUpdate(response: { body: any }) {
		return response.body;
	}

	async list(query: any) {
		const response = await this.request.get("/v2/domains", query);
		return this.__parseDomainList(response);
	}

	async get(domain: string) {
		const response = await this.request.get(`/v2/domains/${domain}`);
		return this.__parseDomain(response);
	}

	async create(data: any) {
		const response = await this.request.post("/v2/domains", data);
		return this.__parseDomain(response);
	}

	async destroy(domain: string) {
		const response = await this.request.delete(`/v2/domains/${domain}`);
		return this.__parseMessage(response);
	}

	// Tracking

	async getTracking(domain: string) {
		const response = await this.request.get(
			urlJoin("/v2/domains", domain, "tracking")
		);
		return this.__parseTrackingSettings(response);
	}

	async updateTracking(domain: string, type: string, data: any) {
		const response = await this.request.put(
			urlJoin("/v2/domains", domain, "tracking", type),
			data
		);
		return this.__parseTrackingUpdate(response);
	}

	// IPs

	async getIps(domain: string) {
		const response = await this.request.get(
			urlJoin("/v2/domains", domain, "ips")
		);
		return response?.body?.items;
	}

	assignIp(domain: string, ip: string) {
		return this.request.post(urlJoin("/v2/domains", domain, "ips"), { ip });
	}

	deleteIp(domain: string, ip: string) {
		return this.request.delete(urlJoin("/v2/domains", domain, "ips", ip));
	}

	linkIpPool(domain: string, pool_id: string) {
		return this.request.post(urlJoin("/v2/domains", domain, "ips"), {
			pool_id,
		});
	}

	unlinkIpPoll(domain: string, pool_id: string, ip: string) {
		return this.request.delete(
			urlJoin("/v2/domains", domain, "ips", "ip_pool"),
			{ pool_id, ip }
		);
	}
}

export { DomainClient };
