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

describe("Client", function () {
	let client: Client;

	beforeEach(function () {
		client = new Client(
			{ username: "username", key: "key", publicKey: "key", timeout: 10000 },
			formData
		);
	});

	it("raises error when username is not provided", () => {
		expect(() => {
			// @ts-expect-error
			client = new Client({ key: "key" }, formData);
		}).toThrow('Parameter "username" is required');
	});

	it("raises error when key is not provided", function () {
		expect(function () {
			// @ts-expect-error
			client = new Client({ username: "username" }, formData);
		}).toThrow('Parameter "key" is required');
	});

	it("exposes raw request client", function () {
		// @ts-expect-error
		expect(client.request).toBeInstanceOf(Request);
	});

	it("creates domain client", function () {
		expect(client.domains).toBeInstanceOf(DomainClient);
	});

	it("creates event client", function () {
		expect(client.events).toBeInstanceOf(EventClient);
	});

	it("creates webhook client", function () {
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
