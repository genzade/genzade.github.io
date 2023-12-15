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
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.gray.200"),
						a: {
							color: theme("colors.green.300"),
							"&:hover": {
								color: theme("colors.green.400"),
							},
							"&:visited": {
								color: theme("colors.green.400"),
							},
						},
						"a:not([href])": {
							color: theme("colors.gray.200"),
							textDecoration: "none",
						},
						blockquote: {
							color: theme("colors.gray.200"),
							fontWeight: "600",
							fontStyle: "italic",
							borderLeftColor: theme("colors.gray.400"),
						},
						code: {
							color: "rgb(255, 180, 84)",
							backgroundColor: theme("colors.gray.800"),
							fontWeight: "400",
							padding: "1px 3px",
							borderRadius: "3px",
						},
						"code::before": {
							content: null,
						},
						"code::after": {
							content: null,
						},
						"a code": {
							color: theme("colors.green.400"),
						},
						h1: {
							color: theme("colors.gray.100"),
						},
						h2: {
							color: theme("colors.gray.100"),
						},
						h3: {
							color: theme("colors.gray.100"),
						},
						h4: {
							color: theme("colors.gray.100"),
						},
						strong: {
							color: theme("colors.gray.50"),
						},
					},
				},
				dark: {
					css: {
						color: theme("colors.gray.300"),
						a: {
							color: theme("colors.primary.500"),
							"&:hover": {
								color: `${theme("colors.primary.400")} !important`,
							},
							code: { color: theme("colors.primary.400") },
						},
						h1: {
							fontWeight: "700",
							letterSpacing: theme("letterSpacing.tight"),
							color: theme("colors.gray.100"),
						},
						h2: {
							fontWeight: "700",
							letterSpacing: theme("letterSpacing.tight"),
							color: theme("colors.gray.100"),
						},
						h3: {
							fontWeight: "600",
							color: theme("colors.gray.100"),
						},
						"h4,h5,h6": {
							color: theme("colors.gray.100"),
						},
						pre: {
							backgroundColor: theme("colors.gray.800"),
						},
						code: {
							backgroundColor: theme("colors.gray.800"),
						},
						details: {
							backgroundColor: theme("colors.gray.800"),
						},
						hr: { borderColor: theme("colors.gray.700") },
						"ol li::marker": {
							fontWeight: "600",
							color: theme("colors.gray.400"),
						},
						"ul li::marker": {
							backgroundColor: theme("colors.gray.400"),
						},
						strong: { color: theme("colors.gray.100") },
						thead: {
							th: {
								color: theme("colors.gray.100"),
							},
						},
						tbody: {
							tr: {
								borderBottomColor: theme("colors.gray.700"),
							},
						},
						blockquote: {
							color: theme("colors.gray.100"),
							borderLeftColor: theme("colors.gray.700"),
						},
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
