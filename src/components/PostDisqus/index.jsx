import React, { Component } from "react";
import Disqus from 'disqus-react';
import urljoin from "url-join";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardText from "react-md/lib/Cards/CardText";
import Avatar from "react-md/lib/Avatars";
import FontIcon from "react-md/lib/FontIcons";
import Snackbar from "react-md/lib/Snackbars";
import config from "../../../data/SiteConfig";

class PostDisqus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: []
    };
    this.notifyAboutComment = this.notifyAboutComment.bind(this);
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this);



  }

  onSnackbarDismiss() {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  }
  notifyAboutComment() {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: "New comment available!" });
    this.setState({ toasts });
  }
  render() {
    

    const { postNode, expanded } = this.props;
    if (!config.disqusShortname) {
      return null;
    }
    const post = postNode;
    const url = urljoin(
      config.siteUrl,
      //config.pathPrefix,
      postNode.fields.slug
    );

    const disqusShortname = config.disqusShortname;
    const disqusConfig = {
      url: url,
      identifier: post.slug,
      title: post.nom,
    };

    return (
      <Card className="md-grid md-cell md-cell--12">
        <CardTitle
          title="Comments"
          avatar={<Avatar icon={<FontIcon>comment</FontIcon>} />}
          expander={!expanded}
        />
        <CardText expandable={!expanded}>
          {/* <Disqus.CommentEmbed
            commentId={this.props.article.featuredComment}
            showMedia={true}
            height={160}
          /> */}

          <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </CardText>
        <Snackbar
          toasts={this.state.toasts}
          onDismiss={this.onSnackbarDismiss}
        />
      </Card>
    );
  }
}

export default PostDisqus;
