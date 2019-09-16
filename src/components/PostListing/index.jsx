import React from "react";
import PostPreview from "../PostPreview";
import CategoryMap from "../CategoryMap";

class PostListing extends React.Component {
  
  constructor(props) {
    super(props);
    this.type = props.type;

  }
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      const { latitude, longitude } = postEdge.node.coordonnees;
      postList.push({
        path: postEdge.node.slug,
        tags: postEdge.node.tags,
        cover_image: postEdge.node.cover_image,
        latitude,
        longitude,
        title: postEdge.node.nom,
        date: postEdge.node.publication,
        exerpt: postEdge.node.exerpt,
        // timeToRead: postEdge.node.timeToRead
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
          return {path:post.path, title:post.title, coordinates:[parseFloat(post.latitude), parseFloat(post.longitude) ]} ;
      }); 
      map = <CategoryMap markers={markers}/>;
    }
    return (
      <div id="post">
        {/* <div >
        <CategoryMap markers={markers} className="md-grid md-grid--no-spacing md-cell--middle" />
        </div> */}
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
