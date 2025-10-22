function ProfielLijstItem({waardeNaam, waarde}) {
  return (
    <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
        <div className='w-[200px] h-[40px] items-center flex'>
            <div>{waardeNaam}: </div>
        </div>
        <div className='w-[200px] h-[40px] items-center flex'>
            <p>{waarde}</p>
        </div>
    </div>
  );
}
export default ProfielLijstItem;
