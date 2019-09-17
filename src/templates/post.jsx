import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Card from "react-md/lib/Cards";
import CardText from "react-md/lib/Cards/CardText";
import Layout from "../layout";
import UserInfo from "../components/UserInfo";
import Disqus from "../components/Disqus";
import PostTags from "../components/PostTags";
import PostCover from "../components/PostCover";
import PostInfo from "../components/PostInfo";
import SocialLinks from "../components/SocialLinks";
import PostSuggestions from "../components/PostSuggestions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import SEO from "../components/SEO";
import PostMap from "../components/PostMap";
import config from "../../data/SiteConfig";
import Author from '../components/Author'
import "./b16-tomorrow-dark.css";
import "./post.scss";

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { mobile } = this.state;
    const { slug } = this.props.pageContext;
    const expanded = !mobile;
    const postOverlapClass = mobile ? "post-overlap-mobile" : "post-overlap";
    const post = this.props.data.contentfulPost;

    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    const {
      tags,
      coordonnees: { latitude, longitude },
      nom,
      publication,
      exerpt,
      contenu: { json },
      auteur
    } = post;
    const options = {
      renderNode: {
        "embedded-asset-block": node => {
          return (
            <div className="rich">
              <img
                className="rich-img"
                width="400"
                src={node.data.target.fields.file["fr-FR"].url}
                alt={node.data.target.fields.title["fr-FR"]}
              />
              {node.data.target.fields.description && (
                <p className="rich-desc">
                  {node.data.target.fields.description["fr-FR"]}
                </p>
              )}
            </div>
          );
        }
      }
    };

    const coverHeight = mobile ? 180 : 350;
    return (
      <Layout location={this.props.location}>
        <div className="post-page md-grid md-grid--no-spacing">
          <Helmet>
            <title>{`${nom} | ${config.siteTitle}`}</title>
            <link
              rel="canonical"
              href={`${config.siteUrl}${post.contentful_id}`}
            />
          </Helmet>
          <SEO postPath={slug} postNode={post} postSEO />
          <PostCover
            postNode={post}
            coverHeight={coverHeight}
            coverClassName="md-grid md-cell--9 post-cover"
          />
          <div
            className={`md-grid md-cell--9 post-page-contents mobile-fix ${postOverlapClass}`}
          >
            <Card className="md-grid md-cell md-cell--12 post">
              <CardText className="post-body">
                <h1 className="md-display-2 post-header">{nom}</h1>
                <PostInfo postNode={post} />
                <PostMap
                  title={nom}
                  latitude={parseFloat(latitude)}
                  longitude={parseFloat(longitude)}
                />
                <div> {documentToReactComponents(json, options)}</div>
              </CardText>
              <div className="post-meta">
                <PostTags tags={tags} />
                <SocialLinks
                  postPath={slug}
                  postNode={post}
                  mobile={this.state.mobile}
                />
              </div>
            </Card>
            <Author author={auteur}/>
            {/* <UserInfo
              className="md-grid md-cell md-cell--12"
              config={config}
              expanded={expanded}
            /> */}
            <Disqus postNode={post} expanded={expanded} />
          </div>

          <PostSuggestions postNode={post} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      slug
      exerpt
      nom
      category
      auteur
      publication(formatString: "DD MMMM YYYY ", locale: "fr")
      tags
      coordonnees {
        latitude: lat
        longitude: lon
      }
      cover_image {
        fluid {
          ...GatsbyContentfulFluid
          src
        }
      }
      contentful_id
      contenu {
        json
      }
      fields {
        slug
        date
        nextTitle
        nextSlug
        prevTitle
        prevSlug
      }
    }
  }
`;
