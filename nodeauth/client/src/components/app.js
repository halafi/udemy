import React, { Component } from "react";
import CommentBox from "./comment_box";
import CommentList from "./comment_list";

import Header from "./header";
import UserList from "./user_list";

export default class App extends Component {
  render() {
    console.log(this.props)
    // uncomment one of different parts
    return (
      // <div>
      //   <CommentBox />
      //   <CommentList />
      // </div>

      <div>
        <Header />
        {this.props.children}
      </div>

      // <div>
      //   <UserList />
      // </div>
    );
  }
}
