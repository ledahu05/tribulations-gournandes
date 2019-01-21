import React from "react";
import PostPreview from "../PostPreview";
import CategoryMap from "../CategoryMap";

class PostListing extends React.Component {
  
  constructor(props) {
    super(props);
    //console.log('Post listing props', props.type);
    this.type = props.type;

  }
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        latitude: postEdge.node.frontmatter.latitude,
        longitude: postEdge.node.frontmatter.longitude,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    let map = null;
    let markers = null;
    if(this.type !== 'all') {
      markers = postList.map(post => {
          console.log(post);
          return {path:post.path, title:post.title, coordinates:[parseFloat(post.latitude), parseFloat(post.longitude) ]} ;
      }); 
      console.log(markers);
      map = <CategoryMap markers={markers}/>;
      console.log(map);
    }
    console.log('Post listing props', this.type);
    return (
      <div>
        <div >
        <CategoryMap markers={markers} className="md-grid md-grid--no-spacing md-cell--middle" />
        </div>
        <div className="md-grid md-grid--no-spacing md-cell--middle">
        
        <div className="md-grid md-cell--8 mobile-fix">
          
          {postList.map(post => (
            <PostPreview key={post.title} postInfo={post} />
          ))}
        </div>
      </div>
      
      </div>
    );
  }
}

export default PostListing;
