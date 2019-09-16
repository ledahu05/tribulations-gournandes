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
                  action="https://formspree.io/tribulations.gourmandes@gmail.com"
                  method="POST"
              >
                
                  <TextField
                      id="name"
                      label="Nom"
                      rows={2}
                      maxRows={6}
                      lineDirection="center"
                      placeholder="Merci de saisir votre nom"
                      className="md-cell md-cell--12"
                  />
                  <TextField
                      id="email"
                      label="Email"
                      rows={2}
                      maxRows={6}
                      lineDirection="center"
                      placeholder="Merci de saisir votre adresse email"
                      className="md-cell md-cell--12"
                  />
                  <TextField
                      id="message"
                      label="Message"
                      rows={2}
                      maxRows={6}
                      placeholder="Merci de saisir votre message"
                      className="md-cell md-cell--12"
                  />
                  <CardActions className="md-cell md-cell--12">
                      <Button raised primary type="submit" className="md-cell--right">
                          Envoyer
            </Button>
                  </CardActions>
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
