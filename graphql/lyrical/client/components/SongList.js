import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends PureComponent {
  render() {
    console.log(this.props.data.loading)
    console.log(this.props.data.songs)
    return (
      <div>
        SongList
      </div>
    )
  }
}

const query = gql`
    {
        songs {
            title
        }
    }
`;

export default graphql(query)(SongList);
