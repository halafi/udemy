import React, { Component } from "react";
import { connect } from "react-redux";

class CommentList extends Component {
  render() {
    const list = this.props.comments.map(comment => (
      <li key={comment}>{comment}</li>
    ));
    return <ul className="CommentList">{list}</ul>;
  }
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    };
}

export default connect(mapStateToProps)(CommentList);
