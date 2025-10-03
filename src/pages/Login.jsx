import AchtergrondLogin from "../media/AchtergrondLogin.jpg";
import GeoprofsLogo from "../media/GeoprofsLogo.png";

function Login() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${AchtergrondLogin})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="bg-white bg-white w-[90%] max-w-[400px] rounded-[15px] shadow-lg p-6 flex flex-col items-center">
          <img src={GeoprofsLogo} alt="Logo" className="w-40 h-auto mb-6" />

          <input
            type="email"
            placeholder="Email..."
            className="w-full h-[40px] bg-[#F4F4F4] rounded-[15px]  px-4 mb-4 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Wachtwoord..."
            className="w-full h-[40px] bg-[#F4F4F4] rounded-[15px]  px-4 mb-6 focus:outline-none"
          />

          <button className="w-full h-[40px] bg-[#1DA1F2] text-white rounded-[15px] font-semibold hover:bg-[#0d8ddb] transition">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
