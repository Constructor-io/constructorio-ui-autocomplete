export const argTypes = {
	placeholder: {
		description: "Search input placeholder",
		table: {
			type: {
				summary: "string",
			},
		},
		control: {
			type: "text",
		},
		defaultValue: "What can we help you find today?",
	},
	apiKey: {
		type: { name: "string", required: true },
		description: "Your constructor API key",
		table: {
			type: {
				summary: "string",
			},
		},
		control: {
			type: "text",
		},
	},
	onSubmit: {
		type: {
			name: "function",
		},
		description: `On search submit callback function`,
		table: {
			type: {
				summary: "Function",
			},
		},
		control: null,
	},
	onFocus: {
		type: {
			name: "function",
		},
		description: `On focus callback function`,
		table: {
			type: {
				summary: "Function",
			},
		},
		control: null,
	},
	openOnFocus: {
		description: "Open results on focus",
		table: {
			type: {
				summary: "boolean",
			},
		},
		control: {
			type: "boolean",
		},
		defaultValue: false,
	},
};