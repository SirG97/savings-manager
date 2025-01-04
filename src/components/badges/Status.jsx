export default function StatusBadge({ status, text }) {
  return (
    <>
      {(status === "danger" || status === "error") && (
        <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
          {text}
        </span>
      )}
      {(status === "pending" || status === "warning") && (
        <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          {text}
        </span>
      )}

      {status === "success" && (
        <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        {text}
        </span> 
      )}
      {status === "primary" && (
        <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
          {text}
        </span>
      )}
   
    </>
  );
}
