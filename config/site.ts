export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Docs",
			href: "/docs",
		},
		{
			label: "Pricing",
			href: "/pricing",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "About",
			href: "/about",
		}
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/seongpil0948",
		twitter: "https://twitter.com/getnextui",
		docs: "https://www.peachhub.love/en/doc/linux/EssentialCommands",
		discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://patreon.com/jrgarciadev"
	},
};

export const links = Object.freeze({
	external: {
		github: "https://github.com/seongpil0948",
		twitter: "https://twitter.com/getnextui",
		docs: "https://www.peachhub.love/en/doc/linux/EssentialCommands",
		discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://patreon.com/jrgarciadev"
	},
	internal: {
		home: "/",
		docs: "/docs",
		pricing: "/pricing",
		blog: "/blog",
		about: "/about",
		profile: "/profile",
		dashboard: "/dashboard",
		projects: "/projects",
		team: "/team",
		calendar: "/calendar",
		settings: "/settings",
		helpFeedback: "/help-feedback",
		logout: "/logout",
		project: "/project",
	}
})