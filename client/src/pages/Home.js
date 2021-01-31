import React from 'react'
// import {useQuery} from '@apollo/client';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Grid, GridRow} from 'semantic-ui-react';
import PostCard from '../components/PostCard';

function Home() {
    const { loading, data: {getPosts: posts}={}} = useQuery(FETCH_POSTS_QUERY)
    
    return (
      <Grid columns={3}>
        <GridRow className='page-title'>
          <h1>Recent Posts</h1>
        </GridRow>
      <Grid.Row>
        {loading?(
          <h1>loading posts..</h1>
        ):(
          posts && posts.map((post) => (
            <Grid.Column key={post.id} style={{marginBottom:20}}>
              <PostCard post={post}/>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
      </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
    id
    body
    createdAt
    username
    likeCount
    commentCount  
    comments{
      id
      body
      createdAt
      username
    }
    likes{
      id
      username
    }
  }
  }
`

export default Home;