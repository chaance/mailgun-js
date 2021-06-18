# `@chance/mailgun-js`

A fork of https://github.com/mailgun/mailgun-js

This is for my personal use, but it may be useful for others. I might add my own documentation eventually but the API is mostly the same as the original.

## Key differences

When instantiating a client, the original lib has a dependency on `ky-universal`. You might already be using `node-fetch` or some other wrapper in your project, so this fork requires you to establish that dependency and tell the client how to make requests.

```js
// Note: Named export instead of a default export!
import { Mailgun } from "@chance/mailgun-js";

// We're using node-fetch, but you could also use ky-universal if you want,
// or native fetch if using in the browser
import nodeFetch from "node-fetch";

import FormData from "form-data";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API_KEY,
	publicKey: process.env.MAILGUN_PUBLIC_API_KEY, // Note: `publicKey` vs. `public_key`
	fetch: nodeFetch,
});
```

There is also lots of room for improvement in the types in the core lib. I'm going to try and tackle some of these. Would love to get these fixed upstream, but there are some old open PRs that don't give me too much hope. We'll see!
- https://github.com/mailgun/mailgun-js/issues/162
- https://github.com/mailgun/mailgun-js/issues/159
- https://github.com/mailgun/mailgun-js/issues/118

Lastly, I'm bundling with Rollup instead of Webpack. I want the bundles to be extremely light on modifying the source to avoid issues [like this](https://github.com/mailgun/mailgun-js/issues/153) (this one in particular is breaking the source lib in Node which ... kind of sucks). I'm also providing ES modules and may decide to skip bundling altogether in a future version. We'll see.
