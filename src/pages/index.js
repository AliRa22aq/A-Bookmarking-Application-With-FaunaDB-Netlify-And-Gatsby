import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Formik, Form,  Field, ErrorMessage} from 'formik';
import { Button, Grid } from '@material-ui/core';
import {TextField} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './main.css'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

const GET_BOOKMARKS = gql`
{
  bookmarks  {
      id
      title
      url
    }
}
`;

const AddBookMarkMutation = gql`
  mutation addBookmark($title: String!, $url: String!){
    addBookmark(title: $title, url: $url){
     title
     url 
    }
}
`;

const DELETE_BOOKMARK = gql`
    mutation deleteBookmark($id: ID!){
      deleteBookmark(id: $id){
            id
        }
    }`

export default function Home() {

const { loading, error, data } = useQuery(GET_BOOKMARKS);
const [addBookmark] = useMutation(AddBookMarkMutation)

const [deleteBookmark] = useMutation(DELETE_BOOKMARK);
const handleDelete = (id) => {
  deleteBookmark({
    variables: {
      id
    },
    refetchQueries: [{ query: GET_BOOKMARKS }]
  })

}


if(loading) return <h1> <CircularProgress /> </h1>
if(error) return  <h1> {error.message} </h1>

return (
<div >

<h1>The best Bookmark app!</h1>
     <Formik
       initialValues={{ title: '', url: '' }}
       onSubmit={(values) => {
          console.log(values)
          addBookmark({
            variables: {
              title: values.title,
              url: values.url
            },
          refetchQueries: [{query:GET_BOOKMARKS}],
         })
       }}
     >
       {() => (
         <Form>
           <Grid container spacing={0} className="container"> 
           <Grid itme xs={10}>
           <Field as= {TextField} fullWidth required name="title" placeholder="Enter title here" label="Title" /> <br />
           <Field as= {TextField} fullWidth required name="url" type='url'  placeholder="Enter URL here" label="URL" /> <br />
           </Grid>
           <Grid item xs={2} className="btn" > 
           <Button type="submit" variant="contained" color="primary"> Add </Button> <br />
           </Grid>
           </Grid>
         </Form>
       )}
     </Formik>

     {
        data.bookmarks.map((post, ind) => {
          return (
              
              <Card variant="outlined" className="cardContainer">
                <Grid container> 
                <Grid item xs={10}> 
                <CardContent>
                  
                  <Typography color="textSecondary" gutterBottom>
                   {`Title: ${post.title}`} 
                  </Typography>
                  <Typography variant="h6" component="h2">
                   URL: <a href={post.url} > {post.url} </a>                    
                  </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={2}> 
                <CardActions className="dlt-btn">
                   <Button size="small" variant="contained" color="secondary" onClick={() => { handleDelete(post.id) }}> <DeleteSharpIcon /> </Button>
                   
                </CardActions>
                </Grid>
                </Grid>
              </Card>
          )
        })
      }
    
    </div>)
}
