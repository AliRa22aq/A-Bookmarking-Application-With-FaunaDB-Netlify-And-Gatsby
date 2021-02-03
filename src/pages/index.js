import React, { useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Formik, Form,  Field, ErrorMessage} from 'formik';
import { Button } from '@material-ui/core';
import {TextField} from '@material-ui/core'


import CircularProgress from '@material-ui/core/CircularProgress';




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

// var title;
// var url;

// const handleSubmit = () => {
// addBookmark({
//     variables: {
//       title: title.value,
//       url: url.value
//     },
//   refetchQueries: [{query:GET_BOOKMARKS}],
//  })
// }



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
    <div>

    {/* Hello world!
    <br />
    <input type="text" placeholder="Title" ref={node => title=node} />
    <br />
    <input type="url" placeholder="URL" ref={node => url=node} />
    <br />
    <button onClick={handleSubmit}>Add</button>
    <br />

      {
        data.bookmarks.map((post, ind) => {
          return (
            <div key = {ind}>
          <h4> {post.title} </h4>
          <h4> {post.url} </h4>
          <button onClick = {()=> {handleDelete(post.id)}} > Delete </button>
            </div>
          )
        })
      } */}

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
           <Field as= {TextField} required name="title" placeholder="Enter title here" label="Title" />
           <Field name="url" type="url" label="Enter URL here" />
           <Button type="submit" variant="contained" color="primary"> Add </Button>
         </Form>
       )}
     </Formik>

     {
        data.bookmarks.map((post, ind) => {
          return (
            <div key = {ind}>
          <h4> {post.title} </h4>
          <h4> <a href={post.url} > {post.url} </a> </h4>
          <button onClick = {()=> {handleDelete(post.id)}} > Delete </button>
            </div>
          )
        })
      }
    
    </div>)
}
