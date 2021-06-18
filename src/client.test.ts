import * as formData from "form-data";
import { Client } from "./client";
import { Request } from "./request";
import { DomainClient } from "./domains";
import { EventClient } from "./events";
import { WebhookClient } from "./webhooks";
import { SuppressionClient } from "./suppressions";
import { MessagesClient } from "./messages";
import { RoutesClient } from "./routes";
import { ValidateClient } from "./validate";
import { ParseClient } from "./parse";

import nodeFetch from "node-fetch";

// https://github.com/sindresorhus/ky/issues/170
// import ky from "ky-universal";

const CLIENT_OPTS = {
	username: "username",
	key: "key",
	publicKey: "key",
	timeout: 10000,
};

describe("Client", () => {
	let client: Client;
	let originalFetch = global.fetch;
	let mockFetch: typeof global.fetch = async () =>
		(await Promise.resolve({
			json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
		})) as any;

	beforeEach(() => {
		global.fetch = jest.fn(mockFetch);
		client = new Client(CLIENT_OPTS, formData);
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	it("raises error when username is not provided", () => {
		expect(() => {
			// @ts-expect-error
			client = new Client({ key: "key" }, formData);
		}).toThrow('Parameter "username" is required');
	});

	it("raises error when key is not provided", () => {
		expect(() => {
			// @ts-expect-error
			client = new Client({ username: "username" }, formData);
		}).toThrow('Parameter "key" is required');
	});

	it("allows node-fetch requests", () => {
		client = new Client({ ...CLIENT_OPTS, fetch: nodeFetch }, formData);

		// @ts-expect-error
		expect(client.request.fetch).toEqual(nodeFetch);
		// @ts-expect-error
		expect(typeof client.request.fetch).toBe("function");
	});

	it("uses global.fetch if no fetch function is provided", () => {
		// @ts-expect-error
		expect(client.request.fetch).toEqual(global.fetch);
		// @ts-expect-error
		expect(typeof client.request.fetch).toBe("function");
	});

	it("exposes raw request client", () => {
		// @ts-expect-error
		expect(client.request).toBeInstanceOf(Request);
	});

	it("creates domain client", () => {
		expect(client.domains).toBeInstanceOf(DomainClient);
	});

	it("creates event client", () => {
		expect(client.events).toBeInstanceOf(EventClient);
	});

	it("creates webhook client", () => {
		expect(client.webhooks).toBeInstanceOf(WebhookClient);
	});

	it("creates suppressions client", () => {
		expect(client.suppressions).toBeInstanceOf(SuppressionClient);
	});

	it("creates messages client", () => {
		expect(client.messages).toBeInstanceOf(MessagesClient);
	});

	it("creates routes client", () => {
		expect(client.routes).toBeInstanceOf(RoutesClient);
	});

	it("creates address validate client", () => {
		expect(client.validate).toBeInstanceOf(ValidateClient);
	});

	it("creates address parse client", () => {
		expect(client.parse).toBeInstanceOf(ParseClient);
	});
});
