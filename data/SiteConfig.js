module.exports = {
  siteTitle: "Tribulations gourmandes", // Site title.
  siteTitleShort: "Tribulations gourmandes", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Tribulations gourmandes", // Alternative site title for SEO.
  siteLogo: "/logos/favicon.png", // Logo used for SEO and manifest.
  siteUrl: "https://www.tribulations-gourmandes.fr", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-material-starter/.
  fixedFooter: false, // Whether the footer component is fixed, i.e. always visible
  siteDescription: "Les restaurants et producteurs locaux des Hautes-Alpes par le menu", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", //"1825356251115265", // FB Application ID for using app insights
  siteGATrackingID: "UA-131758063-1", //"UA-1111111-4", // Tracking code ID for google analytics.
  disqusShortname: "tribulations-gourmandes-1", // Disqus shortname.
  postDefaultCategoryID: "Living", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Alexia", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Chorges, Hautes-Alpes", // User location to display in the author segment.
  userAvatar: "/assets/avatar.png", // User avatar to display in the author segment.
  userDescription:
    "Je suis une incontestable gourmande, amatrice de bonne bouffe en tous genres et de bons vins, sans oublier les bières ! Ce blog a pour but de vous décrire les restaurants de la région Hautes-Alpes par le menu ! Je voulais partager avec vous mes coups de cœur et mon avis en général à propos des restos de notre belle région ! J'y parle également des lieux (que je connais) où vous pouvez trouver des produits locaux en les achetant directement aux producteurs sans intermédiaire et qui sont super bons sur le plan gustatif !!",
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
