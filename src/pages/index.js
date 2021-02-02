import React from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';



const GET_BOOKMARKS = gql`
{
  bookmarks  {
      id
      title
      url
    }
}
`;




export default function Home() {


  const { loading, error, data } = useQuery(GET_BOOKMARKS);
  console.log(data);



  return <div>Hello world!</div>
}
