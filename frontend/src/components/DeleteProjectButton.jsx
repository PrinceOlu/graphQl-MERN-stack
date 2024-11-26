import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";

function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  // Correct usage of useMutation with array destructuring
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

 

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger" onClick={deleteProject}>
        <FaTrash className="icon" />
        Delete Project
      </button>
    </div>
  );
}

export default DeleteProjectButton;
