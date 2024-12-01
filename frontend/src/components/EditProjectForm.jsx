import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [status, setStatus] = useState(project.status);

  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }], // Refetch the projects after updating
    onCompleted: () => alert("Project updated successfully!"),
    onError: (err) => console.error("Error updating project:", err),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !status) {
      alert("Please fill in all required fields");
      return;
    }

    updateProject({
      variables: {
        id: project.id,
        name,
        description, // Description is optional
        status,
      },
    }).catch((err) => {
      console.error("Mutation error:", err);
    });
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading}
          >
            <option value="NEW">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          <FaEdit className="me-2" />
          {loading ? "Updating..." : "Update Project"}
        </button>

        {error && <p className="text-danger mt-2">Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default EditProjectForm;
