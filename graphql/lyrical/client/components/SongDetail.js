import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return null;
    }

    const { song: { title, id, lyrics } } = this.props.data;

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{title}</h3>
        <LyricList lyrics={lyrics}/>
        <LyricCreate songId={id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => {
    // intercept SongDetail props and set query id
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
