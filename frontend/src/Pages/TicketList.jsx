import { useEffect, useState } from "react"
import axios from 'axios';
import Pagination from "../Components/Pagination";

export default function TicketList() {
    const [getTicket, setGetTicket] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalpages, setTotalPages] = useState(1);
    const getData = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                `http://localhost:3000/api/allfiles?page=${page}&limit=10`
            );
            setGetTicket(res.data.data);
            setTotalPages(res.data.pagination.totalpages);
        } catch (error) {
            console.error("error", error.message);
        } finally {
            setLoading(true)
        }
    };

    const deletedata = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/${id}`);
            setGetTicket((prev) => prev.filter((item) => item._id !== id));
        }
        catch (err) {
            console.error("error", err.message);
        }
    }


    useEffect(() => {
        getData();
    }, [page]);


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
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Ticket ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Raised By
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Priority
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                                {getTicket.map((item, index) => (
                                    <tr key={item}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 dark:text-white">
                                            {/* {index + 1} */}
                                            {(page - 1) * 10 + index + 1}

                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm  ">
                                            {item._id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                            {item.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                            {item.role}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm  ">
                                            {item.priority}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                                            {item.status}
                                        </td>


                                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {item.createdAt}
                                        </td> */}
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(item.createdAt).toLocaleDateString("en-IN")}
                                        </td>

                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex gap-6">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                View<span className="sr-only">, {item.name}</span>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                Update Status<span className="sr-only">, {item.name}</span>
                                            </a>
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
    )
}


