import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import Hero from "../components/Hero";
import Blinker from "../components/Blinker";
import { graphql } from "gatsby";

import {
  Button,
  CardActions,
  SelectionControl,
  SelectionControlGroup,
  Snackbar,
  TextField
} from "react-md";

const contact = props => {
  const img = props.data.contactBcg.image.fluid;
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

              <form
                  name="contact"
                  method="post"
                  action="/success"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
              >
                  <input type="hidden" name="bot-field" />
                  <div>
                      <label htmlFor="name">Name</label>
                      <input type="text" name="name" id="name" />
                  </div>
                  <div>
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" id="email" />
                  </div>
                  <div>
                      <label htmlFor="message">Message</label>
                      <textarea name="message" id="message" rows="6" required />
                  </div>
                  <div>
                      <input type="submit" value="Drop a line" />
                      <input type="reset" value="Eraser" />
                  </div>
              </form>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query contactQuery {
    contactBcg: contentfulHero(page: { eq: "contact" }) {
      image {
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;

export default contact;
