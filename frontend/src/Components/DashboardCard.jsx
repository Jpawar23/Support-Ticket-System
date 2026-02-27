export default function DashboardCard({ title, value }) {
  return (
    <div className="mb-6 break-inside-avoid bg-white rounded-lg shadow-sm border p-5 flex items-center justify-between ">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        {value && (
          <h2 className="text-2xl font-semibold text-gray-800">{value}</h2>
        )}
      </div>
    </div>
  );
}
