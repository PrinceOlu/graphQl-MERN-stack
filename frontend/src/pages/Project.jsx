import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROJECT } from "../queries/projectQueries";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";


function Project() {
  // Get the project ID from the URL parameters
  const { id } = useParams();

  // Fetch the project data from the server using the GraphQL query
  const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
    variables: { id },
  });

  // Show a loading spinner while the data is being fetched
  if (loading) return <Spinner />;

  // Display an error message if something goes wrong
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  // Destructure the project data for easier access
  const { name, description, status, client } = data.project;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-light mb-4">
        Back to Home
      </Link>
      <div className="card p-3 shadow">
        <h1 className="mb-3">{name}</h1>
        <p>{description}</p>
        <h5>
          Status: <span className="text-primary">{status}</span>
        </h5>
      </div>

      {client && (
        <div className="card p-3 mt-4 shadow">
          <h5>Client Details:</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <FaIdBadge className="me-2 text-secondary" />
              <strong>Name:</strong> {client.name}
            </li>
            <li className="mb-2">
              <FaEnvelope className="me-2 text-secondary" />
              <strong>Email:</strong> {client.email}
            </li>
            <li className="mb-2">
              <FaPhone className="me-2 text-secondary" />
              <strong>Phone:</strong> {client.phone}
            </li>
          </ul>
          <EditProjectForm projectId={id}/>
          <DeleteProjectButton projectId={id}/>
        </div>
      )}
    </div>
  );
}

export default Project;
