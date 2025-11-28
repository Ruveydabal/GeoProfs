import { useEffect } from "react";

function ToastComponent({ id, message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded-xl shadow-md mb-3 animate-fadeIn">
      {message}
    </div>
  );
}

export default ToastComponent;