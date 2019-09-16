import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Hero from "../components/Hero";
import Blinker from "../components/Blinker";
import { graphql } from "gatsby";

const Success = props => {
    const img = props.data.successBcg.image.fluid;
  return (
    <Layout location={props.location} title="Contact">
      <div className="index-container">
        <Hero home="true" style={{ display: "block" }} img={img}>
          <Blinker />
        </Hero>
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>
        <section id="post">
              <h1 style={{textAlign:'center'}}>Le message a bien été envoyé, merci!</h1>
        </section>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query successQuery {
    successBcg: contentfulHero(page: { eq: "contact" }) {
      image {
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;

export default Success;
