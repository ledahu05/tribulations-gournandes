import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allContentfulPost.edges;

    return (
      <Layout
        location={this.props.location}
        title={`Tagged in ${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
      >
        <div className="tag-container">
          <Helmet>
            <title>{`Posts tagged as "${tag}" | ${config.siteTitle}`}</title>
            <link rel="canonical" href={`${config.siteUrl}/tags/${tag}`} />
          </Helmet>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query TagQuery($tag: String!) {
    allContentfulPost(
      sort: { fields: publication, order: DESC }
      filter: { tags: { eq: $tag } }
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
