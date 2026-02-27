import { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";
export default function TicketList() {
  const [getTicket, setGetTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");
  const getData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/allfiles?page=${page}&limit=10`);
      setGetTicket(res.data.data);
      setTotalPages(res.data.pagination.totalpages);
    } catch (error) {
      console.error("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletedata = async (id) => {
    try {
      const res = await api.delete(`/${id}`);
      setGetTicket((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("error", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/status/${id}`, {
        status: newStatus,
      });

      setGetTicket((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item,
        ),
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 min-h-[70vh]  flex flex-col">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold">Ticket List</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 "
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                  >
                    Ticket ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Raised by
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {getTicket.map((item, index) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      {/* {index + 1} */}
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                      {item._id.slice(0, 7)}...
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm max-w-[80px] truncate">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm max-w-[80px] truncate">
                      {item.createdBy?.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {item.priority}
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {item.status}
                    </td> */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {editingId === item._id ? (
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                          className="border border-indigo-500 rounded px-2 py-1 bg-indigo-50"
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            item.status === "open"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "in-progress"
                                ? "bg-blue-100 text-blue-700"
                                : item.status === "resolved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          {item.status}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex gap-6">
                      <Link
                        to={`/ticket/${item._id}`}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        View<span className="sr-only">, {item._id}</span>
                      </Link>
                      {/* <Link
                        to="#"
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Update Status
                        <span className="sr-only">, {item.name}</span>
                      </Link> */}
                      <button
                        onClick={() => setEditingId(item._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Update Status
                      </button>
                      <button
                        onClick={() => deletedata(item._id)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Delete<span className="sr-only">, {item._id}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Pagination
          currentPage={page}
          totalPages={totalpages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
