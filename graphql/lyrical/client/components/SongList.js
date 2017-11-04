import React, { PureComponent } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongList extends PureComponent {
  onSongDelete(id) {
    this.props.mutate({
      variables: {
        id,
      },
    }).then(() => {
      this.props.data.refetch()
    })
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      console.log(song);
      return (
        <li className="collection-item" key={song.id}>
          {song.title}{" "}
          <i className="material-icons" onClick={() => this.onSongDelete(song.id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>Add Song
        </Link>
      </div>
    );
  }
}

const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
