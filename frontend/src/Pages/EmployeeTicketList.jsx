import api from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function EmployeeTicketList() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState([]);

  const getemployeedatabyid = async (id) => {
    try {
      const res = await api.get(`/mytickets`);
      setEmployeeData(res.data.data);
      console.log("response", res.data.data);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    getemployeedatabyid(id);
  }, [id]);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900 ">
            Employee Ticket List
          </h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
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
                    className="px-3 py-3.5 text-left text-sm font-semibold"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                  >
                    priority
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {employeeData.map((item) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {item._id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 ">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 ">
                      {item.status}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 ">
                      {item.priority}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {/* {item.createdAt} */}
                      {new Date().toLocaleDateString("en-in")}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex gap-6">
                      <Link
                        to={`/ticket/${item._id}`}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
