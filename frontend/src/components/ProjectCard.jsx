function ProjectCard({ project }) {
    return (
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{project.name}</h5>
            <p className="card-text">{project.description}</p>
            <p className="small"> Status: <strong>{project.status}</strong></p>
            <a href={`/project/${project.id}`} className="btn btn-primary">
              View Details
            </a>
          </div>
         
        </div>
      </div>
    );
  }
  
  export default ProjectCard;
  