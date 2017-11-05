import React, { Component } from "react";

class LyricList extends Component {
  handleLike(id) {

  }

  render() {
    console.log(this.props.lyrics);
    return (
      <ul className="collection">
        {this.props.lyrics.map(x => (
          <li key={x.id} className="collection-item">
            {x.content}
            <i onClick={() => this.handleLike(x.id)} className="material-icons">
              thumb_up
            </i>
          </li>
        ))}
      </ul>
    );
  }
}

export default LyricList;
