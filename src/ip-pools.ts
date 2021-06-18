import { Request } from "./request";
import { IpPool } from "./types";

class IpPoolsClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	async list(query: any): Promise<IpPool[]> {
		const response = await this.request.get("/v1/ip_pools", query);
		return this.parseIpPoolsResponse(response);
	}

	async create(data: { name: string; description?: string; ips?: string[] }) {
		const response = await this.request.post("/v1/ip_pools", data);
		return response?.body;
	}

	async update(
		poolId: string,
		data: {
			name: string;
			description: string;
			add_ip: string;
			remove_ip: string;
		}
	) {
		const response = await this.request.patch(`/v1/ip_pools/${poolId}`, data);
		return response?.body;
	}

	async delete(poolId: string, data: { id: string; pool_id: string }) {
		const response = await this.request.delete(`/v1/ip_pools/${poolId}`, data);
		return response?.body;
	}

	private parseIpPoolsResponse(response: { body: any | any }): IpPool[] {
		return response.body.ip_pools;
	}
}

export { IpPoolsClient };
