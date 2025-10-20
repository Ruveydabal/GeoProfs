import { useNavigate } from "react-router-dom";

function OfficeManager() {
  const navigate = useNavigate();

  const uitloggen = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Office Manager Pagina</h1>
      <button
        onClick={uitloggen}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Log uit
      </button>
    </div>
  );
}

export default OfficeManager;