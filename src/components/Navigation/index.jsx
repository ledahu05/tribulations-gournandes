import React, { Component } from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import ToolbarActions from "../ToolbarActions";
import Footer from "../Footer";
import GetNavList from "./NavList";
import "./Navigation.scss";

class Navigation extends Component {
  render() {
    console.log(this.props);
    const { children, config, LocalTitle } = this.props;
    const footerLinks = LocalTitle !== "A propos de moi";
    return (
      <NavigationDrawer
        drawerTitle={config.siteTitle}
        toolbarTitle={LocalTitle}
        contentClassName="main-content"
        navItems={GetNavList(config)}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        toolbarActions={<ToolbarActions config={config} />}
      >
        <div className="main-container">{children}</div>
        <Footer userLinks={footerLinks} />
      </NavigationDrawer>
    );
  }
}

export default Navigation;
