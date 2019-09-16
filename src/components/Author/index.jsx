import React from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardText from "react-md/lib/Cards/CardText";
import Avatar from "react-md/lib/Avatars";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./Author.scss";
import { useStaticQuery, graphql } from "gatsby";

const getAuthors = graphql`
  query Authors {
    allContentfulAuteur {
      edges {
        node {
          nom
          photo {
            fluid {
              src
              ...GatsbyContentfulFluid
            }
          }
          bio {
            json
          }
        }
      }
    }
  }
`;
const index = ({author}) => {
    // console.log(author, 'autheur')
    const data = useStaticQuery(getAuthors);
    const writer = data.allContentfulAuteur.edges.filter((edge) => {
        // console.log(edge.node)
        return edge.node.nom === author
    })

    // console.log(writer)
    const { nom, photo, bio } = writer[0].node
    // console.log(nom, photo, bio)
    return (
        <Card className="md-grid md-cell md-cell--12 user-info">
            <CardTitle
                avatar={<Avatar src={photo.fluid.src} role="presentation" />}
                title={nom}
            />
            <CardText>
                {documentToReactComponents(bio.json)}
            </CardText>
        </Card>
    );
};

export default index;
