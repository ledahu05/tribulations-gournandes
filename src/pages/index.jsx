import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import Hero from "../components/Hero";
import Blinker from "../components/Blinker"

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allContentfulPost.edges;
    return (
      <Layout location={this.props.location} title="Accueil">
        <div className="index-container">
          <Hero home="true" style={{ display: "block" }}>
            <Blinker />
          </Hero>
          <Helmet>
            <title>{config.siteTitle}</title>
            <link rel="canonical" href={`${config.siteUrl}`} />
          </Helmet>
          <SEO postEdges={postEdges} />
          <PostListing postEdges={postEdges} type="all" />
        </div>
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulPost(sort: { fields: publication, order: DESC }) {
      edges {
        node {
          slug
          exerpt
          nom
          category
          publication(formatString: "DD MMMM YYYY ", locale: "fr")
          tags
          coordonnees {
            latitude: lat
            longitude: lon
          }
          cover_image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          contenu {
            json
          }
        }
      }
    }
  }
`;
