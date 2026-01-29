import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export default function TicketForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        description: "",
        priority: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const addticket = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/addticket",
                data
            );
            navigate('/ticket')
            console.log("Contact form submitted:", response.data);

        } catch (error) {
            console.error(
                "Contact form error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <form onSubmit={addticket}>
            <div className="space-y-12">


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Create Support Ticket</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Describe your issue so our support team can assist you quickly.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                Ticket Title <span className='text-xl text-red-800 font-bold'>*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder='Enter name'
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>



                        <div className="sm:col-span-4">
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                Description <span className='text-red-800 text-xl font-bold'>*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    placeholder='Enter description....'
                                    type=""
                                    rows={3}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="priority" className="block text-sm/6 font-medium text-gray-900">
                                Priority
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="priority"
                                    name="priority"
                                    onChange={handleChange}
                                    autoComplete="priority-name"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option></option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                        </div>


                    </div>
                </div>


            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"

                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit Ticket
                </button>
            </div>
        </form>
    )
}








