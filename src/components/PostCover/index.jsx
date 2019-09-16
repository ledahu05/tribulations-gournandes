import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import PostCover from "./PostCoverComponent";

class queryWrapper extends Component {
  render() {
    const { postNode, coverHeight, coverClassName } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query CoverQuery {
            allContentfulPost {
              edges {
                node {
                  cover_image {
                    fluid {
                       ...GatsbyContentfulFluid
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <PostCover
            fileEdges={data.allContentfulPost.edges}
            postNode={postNode}
            coverHeight={coverHeight}
            coverClassName={coverClassName}
          />
        )}
      />
    );
  }
}

export default queryWrapper;
