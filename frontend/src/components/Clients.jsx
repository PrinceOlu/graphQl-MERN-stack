import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow"; // Import the ClientRow component
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <>
      {data.clients.length > 0 ? (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Clients</p>
      )}
    </>
  );
}

export default Clients;
