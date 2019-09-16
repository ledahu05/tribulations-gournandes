import React from "react";
import BackgroundImage from "gatsby-background-image";

import { useStaticQuery, graphql } from "gatsby";

const getImage = graphql`
  query HeroByPage {
    contentfulHero(page: { eq: "home" }) {
      image {
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;

const Hero = ({ img, children, home }) => {
  const data = useStaticQuery(getImage);
  return (
    <BackgroundImage
      className="hero-home"
      fluid={img || data.contentfulHero.image.fluid}
      home={home}
    >
      {children}
    </BackgroundImage>
  );
};

export default Hero;
