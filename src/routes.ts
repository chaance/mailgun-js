import type { Request } from "./request";

class RoutesClient {
	request: Request;

	constructor(request: Request) {
		this.request = request;
	}

	async list(query: any) {
		const response = await this.request.get("/v3/routes", query);
		return response.body.items;
	}

	async get(id: string) {
		const response = await this.request.get(`/v3/routes/${id}`);
		return response.body.route;
	}

	async create(data: any) {
		const response = await this.request.post("/v3/routes", data);
		return response.body.route;
	}

	async update(id: string, data: any) {
		const response = await this.request.put(`/v3/routes/${id}`, data);
		return response.body;
	}

	async destroy(id: string) {
		const response = await this.request.delete(`/v3/routes/${id}`);
		return response.body;
	}
}

export { RoutesClient };
