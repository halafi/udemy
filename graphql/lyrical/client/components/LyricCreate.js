import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  handleSubmit(ev) {
    ev.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
        // refetchQueries: [
        //   {
        //     query: fetchSongs
        //     // variables: ...
        //   }
        // ]
      })
      .then(() => {
        this.setState({
          content: ""
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={ev => this.setState({ content: ev.target.value })}
        />
      </form>
    );
  }
}

const addLyricMutation = gql`
  mutation addLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(addLyricMutation)(LyricCreate);
