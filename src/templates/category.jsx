import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import PostListing from "../components/PostListing";
import Layout from "../layout";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends React.Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allContentfulPost.edges;
    return (
      <Layout
        location={this.props.location}
        title={category.charAt(0).toUpperCase() + category.slice(1)}
      >
        <div className="category-container">
          <Helmet>
            <title>
              {`Posts in category "${category}" | ${config.siteTitle}`}
            </title>
            <link
              rel="canonical"
              href={`${config.siteUrl}/categories/${category}`}
            />
          </Helmet>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
 query CategoryQuery($category: String!) {
    allContentfulPost(
      sort: { fields: publication, order: DESC }
      filter: { category: { eq: $category } }
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
}
`;
