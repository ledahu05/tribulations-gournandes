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
        <section id="contact-form" class="py-3">
          {/* <div class="container"> */}
            <h1 class="l-heading">
             Nous contacter
            </h1>
            <p>Merci d'utiliser le formulaire pour nous contacter par email</p>
            <form
              name="contact"
              method="post"
              action="https://formspree.io/tribulations.gourmandes@gmail.com"
              method="POST"
              id="post"
            >
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea name="message" id="message"></textarea>
              </div>
              <button type="submit" class="btn">
                Submit
              </button>
            </form>
          {/* </div> */}
        </section>
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
