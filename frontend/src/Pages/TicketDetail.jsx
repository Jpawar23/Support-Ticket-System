import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const TicketDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const getdatabyid = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/${id}`);
      setData(res.data.data);
      console.log("Response", res.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getdatabyid(id);
    }
  }, [id]);
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-base/7 font-semibold text-gray-900">
        Ticket Details
      </h1>
      <p className="mt-1 text-sm/6 text-gray-600">
        Here you can view the details of a specific ticket.
      </p>
      <div className="mt-10 divide-y">
        <div className="grid grid-cols-3 py-4">
          <h5 className="text-base font-medium text-gray-500">Ticket ID</h5>
          <p className="col-span-2 text-sm text-gray-900">{data._id}</p>
        </div>

        <div className="grid grid-cols-3 py-4">
          <h5 className="text-base font-medium text-gray-500">Title</h5>
          <p className="col-span-2 text-sm text-gray-900">{data.title}</p>
        </div>

        <div className="grid grid-cols-3 py-4">
          <h5 className="text-base font-medium text-gray-500">Description</h5>
          <p className="col-span-2 text-sm text-gray-900">{data.description}</p>
        </div>

        <div className="grid grid-cols-3 py-4">
          <h5 className="text-base font-medium text-gray-500">Raised by</h5>
          <p className="col-span-2 text-sm text-gray-900"></p>
        </div>

        <div className="grid grid-cols-3 py-4">
          <h5 className="text-base font-medium text-gray-500">Priority</h5>
          <p className="col-span-2 text-sm text-gray-900">{data.priority}</p>
        </div>

        <div className="grid grid-cols-3 py-4">
          <h5 className="text-base font-medium text-gray-500">Status</h5>
          <p className="col-span-2 text-sm text-gray-900">{data.status}</p>
        </div>
      </div>
    </div>
  );
};
export default TicketDetail;
