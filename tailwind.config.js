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
            color: theme("colors.slate.200"),
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
              color: theme("colors.slate.200"),
              textDecoration: "none",
            },
            blockquote: {
              color: theme("colors.slate.200"),
              fontWeight: "600",
              fontStyle: "italic",
              borderLeftColor: theme("colors.slate.400"),
            },
            code: {
              color: "rgb(255, 180, 84)",
              backgroundColor: theme("colors.slate.800"),
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
              color: theme("colors.slate.100"),
            },
            h2: {
              color: theme("colors.slate.100"),
            },
            h3: {
              color: theme("colors.slate.100"),
            },
            h4: {
              color: theme("colors.slate.100"),
            },
            strong: {
              color: theme("colors.slate.50"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
