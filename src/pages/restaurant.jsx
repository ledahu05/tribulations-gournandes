import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import Hero from "../components/Hero";
import Blinker from "../components/Blinker";

class Restaurant extends React.Component {
  render() {
    const postEdges = this.props.data.allContentfulPost.edges;
    const img = this.props.data.restaurantBcg.image.fluid;
    return (
      <Layout location={this.props.location} title="Restaurants">
        <div className="index-container">
          <Hero home="true" style={{ display: "block" }} img={img}>
            <Blinker />
          </Hero>
          <Helmet>
            <title>{config.siteTitle}</title>
            <link rel="canonical" href={`${config.siteUrl}`} />
          </Helmet>
          <SEO postEdges={postEdges} />
          <PostListing postEdges={postEdges} type="restaurant" />
        </div>
      </Layout>
    );
  }
}

export default Restaurant;

export const pageQuery = graphql`
  query RestaurantQuery {
    allContentfulPost(
      sort: { fields: publication, order: DESC }
      filter: { category: { eq: "Restaurant" } }
    ) {
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
              src
            }
          }
          contenu {
            json
          }
        }
      }
    }
    restaurantBcg:contentfulHero(page: { eq: "restaurant" }) {
      image {
        title
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;
