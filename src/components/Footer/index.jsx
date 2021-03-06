import React, { Component } from "react";
import Button from "react-md/lib/Buttons";

import UserLinks from "../UserLinks";
import config from "../../../data/SiteConfig";
import CookieConsent, { Cookies } from "react-cookie-consent";
import "./Footer.scss";

class Footer extends Component {
  render() {
    const url = config.siteRss;
    const { userLinks } = this.props;
    const { copyright, fixedFooter } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className={fixedFooter ? "footer footer-fixed" : "footer"}>
        {userLinks ? <UserLinks config={config} labeled /> : null}
        <div className="notice-container">
          <div className="copyright" >
            <h4>{copyright}</h4>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
