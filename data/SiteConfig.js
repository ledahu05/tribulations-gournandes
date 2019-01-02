module.exports = {
  siteTitle: "Tribulations gourmandes", // Site title.
  siteTitleShort: "Gourmandises", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Tribulations gourmandes", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://www.tribulations-gourmandes.fr", // Domain of your website without pathPrefix.
  pathPrefix: "/tribulations-gourmandes", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "TODO", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", //"1825356251115265", // FB Application ID for using app insights
  siteGATrackingID: "", //"UA-1111111-4", // Tracking code ID for google analytics.
  disqusShortname: "tribulations-gourmandes-1", // Disqus shortname.
  postDefaultCategoryID: "Living", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Alexia", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Chorges, Hautes-Alpes", // User location to display in the author segment.
  userAvatar: "/assets/avatar.png", // User avatar to display in the author segment.
  userDescription:
    "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Email",
      url: "mailto:tribulations.gourmandes@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2018. Les tribulations gourmandes d'Alexia" // Copyright string for the footer of the website and RSS feed.
};
