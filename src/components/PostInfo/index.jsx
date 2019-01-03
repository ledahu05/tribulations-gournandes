import React, { Component } from "react";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Avatar from "react-md/lib/Avatars";
import FontIcon from "react-md/lib/FontIcons";
import { Link } from "gatsby";
import moment from "moment";
import _ from "lodash";
import config from "../../../data/SiteConfig";
import "./PostInfo.scss";

class PostInfo extends Component {
  render() {
    const { postNode } = this.props;
    const post = postNode.frontmatter;
    return (
      <div className="post-info">
        <CardTitle
          avatar={<Avatar icon={<FontIcon iconClassName="fa fa-calendar" />} />}
          title={`Publié le ${moment(postNode.fields.date).format(
            config.dateFormat
          )}`}
          subtitle={`${postNode.timeToRead} min de lecture`}
        />
        <Link
          className="category-link"
          to={`/categories/${_.kebabCase(post.category)}`}
        >
          <CardTitle
            avatar={
              <Avatar icon={<FontIcon iconClassName="fa fa-folder-open" />} />
            }
            title="Dans la catégorie"
            subtitle={post.category}
          />
        </Link>
      </div>
    );
  }
}

export default PostInfo;
