import {FaTrash} from "react-icons/fa"
function ClientRow({ client }) {
    return (
      <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
          {/* Optional: Add actions like edit or delete */}
          <button className="btn btn-danger btn-sm"><FaTrash /> Delete</button>
        </td>
      </tr>
    );
  }
  
  export default ClientRow;
  