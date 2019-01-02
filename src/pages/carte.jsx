import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import { Map, TileLayer } from 'react-leaflet'


class Carte extends React.Component {
  
  render() {
    // const position = [44.5381638, 6.2694616];
    const position = [51.505, -0.09]
    
    
    if (typeof window !== 'undefined') {
      
      return (
        <Layout location={this.props.location} title="Sur la Carte">
        <div className="index-container" style={{  height: "400px" }}>
          <Map center={position} zoom={13}>
          <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </Map>
        </div>
      </Layout>
      )
    }
    
    return (
      <h1>Waiting</h1>
    );

    
  }
}

export default Carte;

export const pageQuery = graphql`
  query CarteQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;

