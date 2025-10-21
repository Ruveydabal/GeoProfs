import Header from '../components/Header.jsx'

function Profiel() {
    //temp variables
    const data = {
        voornaam: "john",
        achternaam: "joe",
        email: "johndoe@geoprofs.com",
        BSNNummer: "123456789",
    };

    const petList = Object.entries(data)

  return (
    <>
        <Header/>
        <div className='h-[90%] w-full'>
            <div className='h-[120px] w-full flex items-center'>
                <button className='h-[40px] max-w-[90%] w-[100px] bg-[#2AAFF2] text-white rounded-[15px] ml-[50px]'>Home</button>
            </div>
            <div className='flex h-[calc(100%-120px)] flex-1 mx-[50px]'>
                <div className='h-full w-[300px]'>
                    <img src="" alt="Profiel Foto" className='h-[300px] aspect-square bg-[#fff] rounded-[15px] border-1 border-solid border-[#D0D0D0]'/>
                </div>
                <div className='h-full flex-1 ml-[50px]'>
                    <p className='text-[20px]'>Persoonlijke informatie</p>

                    {petList.map(([key,value])=> (
                        <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
                            <div className='w-[200px] h-[40px] bg-[#f00] items-center flex'>
                                <div>{key}: </div>
                            </div>
                            <div className='w-[200px] h-[40px] bg-[#0f0] items-center flex'>
                                <p>{value.toString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  );
}
export default Profiel;
