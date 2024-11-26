import AddClientsModal from '../components/AddClientsModal'
import Projects from '../components/Projects'
import Clients from '../components/Clients'
import AddProjectsModal from '../components/AddProjectsModal'

function Home() {
  return (
    <div>
        <div className="d-flex gap-3 mb-4">
        <AddClientsModal />
        <AddProjectsModal />
        </div>
       
      <Projects />
      <hr />
       <Clients />
    </div>
  )
}

export default Home