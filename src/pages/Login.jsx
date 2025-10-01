import AchtergrondLogin from "../media/AchtergrondLogin.jpg";
import GeoprofsLogo from "../media/GeoprofsLogo.png";
function Login() {
  return (
    <>
      <div
        className="w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${AchtergrondLogin})` }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="bg-white w-[500px] h-[475px] rounded-[20px] shadow-lg p-6 flex items-center justify-center">
            <img src={GeoprofsLogo} alt="Logo" className="w-399 h-auto mb-4" />
            
          </div>
          
        </div>
        
      </div>
    </>
  );
}
export default Login;
