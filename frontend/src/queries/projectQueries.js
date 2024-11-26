import { gql } from "@apollo/client";


// query to get all projects
const GET_PROJECTS = gql`
query getProjects{
projects {
    id
    name
    status
    client{
      name
      email
    }
  }
}
`
;

// query to get a single project
const GET_SINGLE_PROJECT = gql`
query getSingleProject($id: ID!){
      project(id: $id){
       id
       name
       description
       status
       client{
             id
             name
             email
             phone
          }
      }
}
`
export {GET_PROJECTS, GET_SINGLE_PROJECT}