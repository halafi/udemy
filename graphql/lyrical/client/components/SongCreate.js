import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { hashHistory, Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  onSubmit(ev) {
    ev.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [
          {
            query: fetchSongs
            // variables: ...
          }
        ]
      })
      .then(() => {
        hashHistory.push("/");
      });
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            value={this.state.title}
            onChange={ev => this.setState({ title: ev.target.value })}
          />
        </form>
      </div>
    );
  }
}

const addSongMutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(addSongMutation)(SongCreate);
