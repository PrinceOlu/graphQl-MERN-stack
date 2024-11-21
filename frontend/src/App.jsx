import AddClientsModal from "./components/AddClientsModal"
import Clients from "./components/Clients"
import Header from "./components/Header"
import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"
import Projects from "./components/Projects"


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
})
function App() {
  
  return (
    <>
    <ApolloProvider client={client}>
    <Header />
      <div className='container'>
      <AddClientsModal />
      <Projects />
       <Clients />
       
      </div>
    </ApolloProvider>   
    </>
  )
}

export default App
