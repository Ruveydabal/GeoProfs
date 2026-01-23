function ProfielLijstItem({waardeNaam, SetWaarde, waarde, aanHetWijzigen}) {
  return (
    <div className='flex flex-wrap w-full h-[auto] mb-[20px]'>
        <div className='w-[200px] h-[40px] items-center flex'>
            <div>{waardeNaam}: </div>
        </div>
        {aanHetWijzigen ? 
        <div className='w-auto h-[40px] items-center flex'>
          <input
            className="h-full w-full border-1 border-solid border-[#D0D0D0] p-[5px] rounded-[15px] bg-[#F4F4F4]"
            key={waardeNaam}
            type="text"
            placeholder={waardeNaam}
            value={waarde}
            onChange={(e) => SetWaarde(e.target.value)}
          />
        </div>
        :
        <div className='w-auto h-[40px] items-center flex'>
            <p>{waarde}</p>
        </div>
      }
    </div>
  );
}
export default ProfielLijstItem;
