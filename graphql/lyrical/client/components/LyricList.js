import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
class LyricList extends Component {
  handleLike(id, likes) {
    this.props.mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }

  render() {
    console.log(this.props.lyrics);
    return (
      <ul className="collection">
        {this.props.lyrics.map(x => (
          <li key={x.id} className="collection-item">
            {x.content}
            <div className="vote-box">
              <i
                onClick={() => this.handleLike(x.id, x.likes)}
                className="material-icons"
              >
                thumb_up
              </i>
              {x.likes}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

const likeLyricMutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(likeLyricMutation)(LyricList);
