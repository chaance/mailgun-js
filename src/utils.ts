export function btoa(data: string | Buffer) {
	let buffer =
		data instanceof Buffer ? data : Buffer.from(data.toString(), "binary");
	return buffer.toString("base64");
}

// https://github.com/jfromaniello/url-join#readme
export function urlJoin(...parts: string[]): string;
export function urlJoin(parts: string[]): string;
export function urlJoin(partOrParts: string | string[], ...rest: string[]) {
	let input = Array.isArray(partOrParts) ? partOrParts : [partOrParts, ...rest];
	let resultArray: string[] = [];

	if (input.length === 0) {
		return "";
	}

	if (typeof input[0] !== "string") {
		throw new TypeError("Url must be a string. Received " + input[0]);
	}

	// If the first part is a plain protocol, we combine it with the next part.
	if (input[0].match(/^[^/:]+:\/*$/) && input.length > 1) {
		let first = input.shift();
		input[0] = first + input[0];
	}

	// There must be two or three slashes in the file protocol, two slashes in
	// anything else.
	if (input[0].match(/^file:\/\/\//)) {
		input[0] = input[0].replace(/^([^/:]+):\/*/, "$1:///");
	} else {
		input[0] = input[0].replace(/^([^/:]+):\/*/, "$1://");
	}

	for (let i = 0; i < input.length; i++) {
		let component = input[i];

		if (typeof component !== "string") {
			throw new TypeError("Url must be a string. Received " + component);
		}

		if (component === "") {
			continue;
		}

		if (i > 0) {
			// Removing the starting slashes for each component but the first.
			component = component.replace(/^[/]+/, "");
		}
		if (i < input.length - 1) {
			// Removing the ending slashes for each component but the last.
			component = component.replace(/[/]+$/, "");
		} else {
			// For the last component we will combine multiple slashes to a single
			// one.
			component = component.replace(/[/]+$/, "/");
		}

		resultArray.push(component);
	}

	let str = resultArray.join("/");
	// Each input component is now separated by a single slash except the possible
	// first plain protocol part.

	// remove trailing slash before parameters or hash
	str = str.replace(/\/(\?|&|#[^!])/g, "$1");

	// replace ? in parameters with &
	let parts = str.split("?");
	str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");

	return str;
}
