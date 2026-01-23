import { useEffect } from "react";

function ToastComponent({ id, bericht, duur = 3000, bijSluiten }) {
  useEffect(() => {
    const timer = setTimeout(() => bijSluiten(id), duur);
    return () => clearTimeout(timer);
  }, [id, duur, bijSluiten]);

  return (
    <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded-[15px] shadow-md mb-3 animate-fadeIn">
      {bericht}
    </div>
  );
}

export default ToastComponent;