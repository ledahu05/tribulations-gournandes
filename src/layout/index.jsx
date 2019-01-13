import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import Navigation from "../components/Navigation";
import config from "../../data/SiteConfig";
import favicon from "../favicon.png";
import "./index.scss";
import "./global.scss";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Navigation config={config} LocalTitle={this.props.title}>
      <script src="/sw.js" />
        <div>
          <Helmet>
            <meta name="description" content={config.siteDescription} />
            <link rel="shortcut icon" type="image/png" href={favicon} />
          </Helmet>
          {children}
        </div>
      </Navigation>
    );
  }
}
