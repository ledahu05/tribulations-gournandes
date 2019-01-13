import React from "react";
import FontIcon from "react-md/lib/FontIcons";
import { Link } from "gatsby";

function GetNavList(config) {
  const NavList = [
    {
      primaryText: "Accueil",
      leftIcon: <FontIcon>home</FontIcon>,
      component: Link,
      to: "/"
    },
    {
      divider: true
    }
  ];

  NavList.push({
    primaryText: "Les Restaurants",
    leftIcon:   <FontIcon forceSize iconClassName={"fa fa-cutlery"} />,
    component: Link,
    to: "/restaurant"
  });

  

  NavList.push({
    primaryText: "Producteurs locaux",
    leftIcon: <FontIcon forceSize iconClassName={"fa fa-handshake-o"} />,
    component: Link,
    to: "/producteur"
  });

  // NavList.push({
  //   primaryText: link.label,
  //   leftIcon: <FontIcon forceSize iconClassName={link.iconClassName} />,
  //   component: "a",
  //   href: link.url
  // });

  if (config.userLinks) {
    config.userLinks.forEach(link => {
      console.log('fonticon:' + link.iconClassName);
      NavList.push({
        primaryText: link.label,
        leftIcon: <FontIcon forceSize iconClassName={link.iconClassName} />,
        component: "a",
        href: link.url
      });
    });
  }

  NavList.push({ divider: true });

  NavList.push({
    primaryText: "Qui suis-je?",
    leftIcon: <FontIcon>person</FontIcon>,
    component: Link,
    to: "/about/"
  });

  

  return NavList;
}
export default GetNavList;
