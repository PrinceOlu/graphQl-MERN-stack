import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations"; // You'll need to define this mutation

function EditProjectForm({ project }) {
  // Set up state to manage form inputs
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);

  // Mutation for updating project
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: () => alert('Project updated successfully!'), // Optionally show a success message
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      alert("Please fill in all fields");
      return;
    }
    updateProject(); // Trigger the mutation
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        {/* Project Name */}
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
          />
        </div>

        {/* Description */}
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
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="NEW">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          <FaEdit className="me-2" />
          Update Project
        </button>
      </form>
    </div>
  );
}

export default EditProjectForm;
