import type nodeFetch from "node-fetch";
import type ky from "ky-universal";

export type CreateOptions = {
	to: string | string[];
	message?: string;
	text?: string | string[];
	html?: string | string[];
	attachment?: any;
	[key: string]: any;
};

export interface APIErrorOptions {
	headers: { [key: string]: any };
	status: number | string;
	message: string;
	body: any;
	url: string;
	statusText: string;
}

export interface IpPool {
	description: string;
	ips: string[];
	is_linked: boolean;
	name: string;
	pool_id: string;
}

export interface IpsListResponseBody {
	assignable_to_pools: boolean;
	items: string[];
	total_count: number;
}

export interface IpData {
	ip: string;
	dedicated: boolean;
	rdns: string;
}

export interface Options {
	username: string;
	key: string;
	url?: string;
	publicKey?: string;
	timeout?: number;
	fetch?: typeof global.fetch | typeof nodeFetch | typeof ky;
}

export interface RequestOptions extends Options {
	headers: any;
	fetch?: typeof global.fetch | typeof nodeFetch | typeof ky;
}

export interface StatsOptions {
	start: string | Date;
	end: string | Date;
	resolution: string;
	stats: {
		time: string | Date;
		delivered: {
			smtp: number;
			http: number;
			total: number;
		};
	}[];
}

export interface BounceData {
	address: string;
	code: number;
	error: string;
	created_at: string | Date;
}

export interface ComplaintData {
	address: string;
	created_at: string | Date;
}

export interface UnsubscribeData {
	address: string;
	tags: any;
	created_at: string | Date;
}

export type MessageHeader =
	| "A-IM"
	| "Accept"
	| "Accept-Additions"
	| "Accept-CH"
	| "Accept-Charset"
	| "Accept-Datetime"
	| "Accept-Encoding"
	| "Accept-Features"
	| "Accept-Language"
	| "Accept-Language"
	| "Accept-Patch"
	| "Accept-Post"
	| "Accept-Ranges"
	| "Age"
	| "Allow"
	| "ALPN"
	| "Also-Control"
	| "Alt-Svc"
	| "Alt-Used"
	| "Alternate-Recipient"
	| "Alternates"
	| "Apply-To-Redirect-Ref"
	| "Approved"
	| "ARC-Authentication-Results"
	| "ARC-Message-Signature"
	| "ARC-Seal"
	| "Archive"
	| "Archived-At"
	| "Archived-At"
	| "Article-Names"
	| "Article-Updates"
	| "Authentication-Control"
	| "Authentication-Info"
	| "Authentication-Results"
	| "Authorization"
	| "Auto-Submitted"
	| "Autoforwarded"
	| "Autosubmitted"
	| "Base"
	| "Bcc"
	| "Body"
	| "C-Ext"
	| "C-Man"
	| "C-Opt"
	| "C-PEP"
	| "C-PEP-Info"
	| "Cache-Control"
	| "Cal-Managed-ID"
	| "CalDAV-Timezones"
	| "Cancel-Key"
	| "Cancel-Lock"
	| "Cc"
	| "CDN-Loop"
	| "Cert-Not-After"
	| "Cert-Not-Before"
	| "Close"
	| "Comments"
	| "Comments"
	| "Connection"
	| "Content-Alternative"
	| "Content-Base"
	| "Content-Base"
	| "Content-Description"
	| "Content-Disposition"
	| "Content-Disposition"
	| "Content-Duration"
	| "Content-Encoding"
	| "Content-features"
	| "Content-ID"
	| "Content-ID"
	| "Content-Identifier"
	| "Content-Language"
	| "Content-Language"
	| "Content-Length"
	| "Content-Location"
	| "Content-Location"
	| "Content-MD5"
	| "Content-MD5"
	| "Content-Range"
	| "Content-Return"
	| "Content-Script-Type"
	| "Content-Style-Type"
	| "Content-Transfer-Encoding"
	| "Content-Translation-Type"
	| "Content-Type"
	| "Content-Type"
	| "Content-Version"
	| "Control"
	| "Conversion"
	| "Conversion-With-Loss"
	| "Cookie"
	| "Cookie2"
	| "DASL"
	| "DAV"
	| "DL-Expansion-History"
	| "Date"
	| "Date"
	| "Date"
	| "Date-Received"
	| "Default-Style"
	| "Deferred-Delivery"
	| "Delivery-Date"
	| "Delta-Base"
	| "Depth"
	| "Derived-From"
	| "Destination"
	| "Differential-ID"
	| "Digest"
	| "Discarded-X400-IPMS-Extensions"
	| "Discarded-X400-MTS-Extensions"
	| "Disclose-Recipients"
	| "Disposition-Notification-Options"
	| "Disposition-Notification-To"
	| "Distribution"
	| "DKIM-Signature"
	| "Downgraded-Bcc"
	| "Downgraded-Cc"
	| "Downgraded-Disposition-Notification-To"
	| "Downgraded-Final-Recipient"
	| "Downgraded-From"
	| "Downgraded-In-Reply-To"
	| "Downgraded-Mail-From"
	| "Downgraded-Message-Id"
	| "Downgraded-Original-Recipient"
	| "Downgraded-Rcpt-To"
	| "Downgraded-References"
	| "Downgraded-Reply-To"
	| "Downgraded-Resent-Bcc"
	| "Downgraded-Resent-Cc"
	| "Downgraded-Resent-From"
	| "Downgraded-Resent-Reply-To"
	| "Downgraded-Resent-Sender"
	| "Downgraded-Resent-To"
	| "Downgraded-Return-Path"
	| "Downgraded-Sender"
	| "Downgraded-To"
	| "Early-Data"
	| "Encoding"
	| "Encrypted"
	| "ETag"
	| "Expect"
	| "Expect-CT"
	| "Expires"
	| "Expires"
	| "Expires"
	| "Expiry-Date"
	| "Ext"
	| "Followup-To"
	| "Forwarded"
	| "From"
	| "From"
	| "From"
	| "Generate-Delivery-Report"
	| "GetProfile"
	| "Hobareg"
	| "Host"
	| "HTTP2-Settings"
	| "IM"
	| "If"
	| "If-Match"
	| "If-Modified-Since"
	| "If-None-Match"
	| "If-Range"
	| "If-Schedule-Tag-Match"
	| "If-Unmodified-Since"
	| "Importance"
	| "In-Reply-To"
	| "Include-Referred-Token-Binding-ID"
	| "Incomplete-Copy"
	| "Injection-Date"
	| "Injection-Info"
	| "Keep-Alive"
	| "Keywords"
	| "Keywords"
	| "Label"
	| "Language"
	| "Last-Modified"
	| "Latest-Delivery-Time"
	| "Lines"
	| "Link"
	| "List-Archive"
	| "List-Help"
	| "List-ID"
	| "List-Owner"
	| "List-Post"
	| "List-Subscribe"
	| "List-Unsubscribe"
	| "List-Unsubscribe-Post"
	| "Location"
	| "Lock-Token"
	| "Man"
	| "Max-Forwards"
	| "Memento-Datetime"
	| "Message-Context"
	| "Message-ID"
	| "Message-ID"
	| "Message-Type"
	| "Meter"
	| "MIME-Version"
	| "MIME-Version"
	| "MMHS-Exempted-Address"
	| "MMHS-Extended-Authorisation-Info"
	| "MMHS-Subject-Indicator-Codes"
	| "MMHS-Handling-Instructions"
	| "MMHS-Message-Instructions"
	| "MMHS-Codress-Message-Indicator"
	| "MMHS-Originator-Reference"
	| "MMHS-Primary-Precedence"
	| "MMHS-Copy-Precedence"
	| "MMHS-Message-Type"
	| "MMHS-Other-Recipients-Indicator-To"
	| "MMHS-Other-Recipients-Indicator-CC"
	| "MMHS-Acp127-Message-Identifier"
	| "MMHS-Originator-PLAD"
	| "MT-Priority"
	| "Negotiate"
	| "Newsgroups"
	| "NNTP-Posting-Date"
	| "NNTP-Posting-Host"
	| "Obsoletes"
	| "OData-EntityId"
	| "OData-Isolation"
	| "OData-MaxVersion"
	| "OData-Version"
	| "Opt"
	| "Optional-WWW-Authenticate"
	| "Ordering-Type"
	| "Organization"
	| "Organization"
	| "Origin"
	| "Original-Encoded-Information-Types"
	| "Original-From"
	| "Original-Message-ID"
	| "Original-Recipient"
	| "Original-Sender"
	| "Originator-Return-Address"
	| "Original-Subject"
	| "OSCORE"
	| "Overwrite"
	| "P3P"
	| "Path"
	| "PEP"
	| "PICS-Label"
	| "PICS-Label"
	| "Pep-Info"
	| "Position"
	| "Posting-Version"
	| "Pragma"
	| "Prefer"
	| "Preference-Applied"
	| "Prevent-NonDelivery-Report"
	| "Priority"
	| "ProfileObject"
	| "Protocol"
	| "Protocol-Info"
	| "Protocol-Query"
	| "Protocol-Request"
	| "Proxy-Authenticate"
	| "Proxy-Authentication-Info"
	| "Proxy-Authorization"
	| "Proxy-Features"
	| "Proxy-Instruction"
	| "Public"
	| "Public-Key-Pins"
	| "Public-Key-Pins-Report-Only"
	| "Range"
	| "Received"
	| "Received-SPF"
	| "Redirect-Ref"
	| "References"
	| "References"
	| "Referer"
	| "Relay-Version"
	| "Replay-Nonce"
	| "Reply-By"
	| "Reply-To"
	| "Reply-To"
	| "Require-Recipient-Valid-Since"
	| "Resent-Bcc"
	| "Resent-Cc"
	| "Resent-Date"
	| "Resent-From"
	| "Resent-Message-ID"
	| "Resent-Reply-To"
	| "Resent-Sender"
	| "Resent-To"
	| "Retry-After"
	| "Return-Path"
	| "Safe"
	| "Schedule-Reply"
	| "Schedule-Tag"
	| "Sec-Token-Binding"
	| "Sec-WebSocket-Accept"
	| "Sec-WebSocket-Extensions"
	| "Sec-WebSocket-Key"
	| "Sec-WebSocket-Protocol"
	| "Sec-WebSocket-Version"
	| "Security-Scheme"
	| "See-Also"
	| "Sender"
	| "Sender"
	| "Sensitivity"
	| "Server"
	| "Set-Cookie"
	| "Set-Cookie2"
	| "SetProfile"
	| "SLUG"
	| "SoapAction"
	| "Solicitation"
	| "Status-URI"
	| "Strict-Transport-Security"
	| "Subject"
	| "Subject"
	| "Summary"
	| "Sunset"
	| "Supersedes"
	| "Supersedes"
	| "Surrogate-Capability"
	| "Surrogate-Control"
	| "TCN"
	| "TE"
	| "Timeout"
	| "TLS-Report-Domain"
	| "TLS-Report-Submitter"
	| "TLS-Required"
	| "To"
	| "Topic"
	| "Trailer"
	| "Transfer-Encoding"
	| "TTL"
	| "Urgency"
	| "URI"
	| "Upgrade"
	| "User-Agent"
	| "User-Agent"
	| "Variant-Vary"
	| "Vary"
	| "VBR-Info"
	| "Via"
	| "WWW-Authenticate"
	| "Want-Digest"
	| "Warning"
	| "X400-Content-Identifier"
	| "X400-Content-Return"
	| "X400-Content-Type"
	| "X400-MTS-Identifier"
	| "X400-Originator"
	| "X400-Received"
	| "X400-Recipients"
	| "X400-Trace"
	| "X-Content-Type-Options"
	| "X-Frame-Options"
	| "Xref";
