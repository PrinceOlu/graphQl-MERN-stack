import { gql } from "@apollo/client";

// GraphQL Mutation
const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String, $status: ProjectStatus!, $clientId: ID!) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;
const UPDATE_PROJECT = gql`
  mutation UpdateProject($name: String!, $description: String, $status: ProjectStatus!, $clientId: ID!) {
    updateProject(name: $name, description: $description, status: $status, clientId: $clientId) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT };
