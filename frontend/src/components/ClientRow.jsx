import {FaTrash} from "react-icons/fa"
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT,{
    variables: {id: client.id},
    // NB: Upon delete, the data deletes from the db
    // but it does reflects on the UI
    // 2 methods to solve this
    // 1. Update the cache
    update(cache, {data: {deleteClient}}){
      const {clients } = cache.readQuery({query:GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(client => client.id !== deleteClient.id)
        }
      })
    }
    // 2. refect the query, NOT RECOMMENDED FOR LARGE APPS 
    // refetchQueries: [{query: GET_CLIENTS}]
  })
    return (
      <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          {/* Optional: Add actions like edit or delete */}
          <button className="btn btn-danger btn-sm" onClick={deleteClient}><FaTrash /> Delete</button>
        </td>
      </tr>
    );
  }
  
  export default ClientRow;
  