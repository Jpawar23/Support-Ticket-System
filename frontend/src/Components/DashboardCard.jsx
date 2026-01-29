
export default function DashboardCard({ title, value }) {
    // return (
    //     <ul role="list">
    //         <li

    //             className="overflow-hidden rounded-md bg-white px-6 py-4 shadow dark:bg-gray-800/50 dark:shadow-none dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10"
    //         >
    //             <p>{title}</p>
    //             <p>{value}</p>

    //         </li>
    //     </ul>
    // )

    return (
        // <div className={`bg-white rounded-lg shadow-sm border p-5 flex items-center justify-between ${className}`}>
        <div className="mb-6 break-inside-avoid bg-white rounded-lg shadow-sm border p-5 flex items-center justify-between ">

            <div>
                <p className="text-sm text-gray-500">{title}</p>

                {value && (
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {value}
                    </h2>
                )}

                {/* {children && <div className="mt-2">{children}</div>} */}
            </div>


        </div>
        // </div>
    );
}




