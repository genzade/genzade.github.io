// const plugin = require("tailwindcss/plugin");
module.exports = {
	content: [
		"./_drafts/**/*.html",
		"./_includes/**/*.html",
		"./_layouts/**/*.html",
		"./_posts/*.md",
		"./*.md",
		"./*.html",
	],
	theme: {
		theme: {
			extend: {
				typography: (theme) => ({
					default: {
						css: {
							pre: {
								color: theme("colors.grey.1000"),
								backgroundColor: theme("colors.grey.100"),
							},
							"pre code::before": {
								"padding-left": "unset",
							},
							"pre code::after": {
								"padding-right": "unset",
							},
							code: {
								backgroundColor: theme("colors.grey.100"),
								color: "#DD1144",
								fontWeight: "400",
								"border-radius": "0.25rem",
							},
							"code::before": {
								content: '""',
								"padding-left": "0.25rem",
							},
							"code::after": {
								content: '""',
								"padding-right": "0.25rem",
							},
						},
					},
				}),
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss/plugin")(function ({ addVariant }) {
			addVariant(
				"prose-inline-code",
				'&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))',
			);
		}),
	],
};
