function VerlofAfkeurenPopup({SetPopupWeergeven, verlofAanvraagId}) {
  return (
    <div className="flex justify-center items-center absolute top-0 left- 0 w-full h-full bg-[#00000050]">
        <div className="w-[500px] p-[50px] h-auto bg-[#fff] rounded-[15px]">
            <div className="flex w-full h-full items-center flex-col">
                <p>{verlofAanvraagId}</p>
            </div>
        </div>
    </div>
  );
}

export default VerlofAfkeurenPopup


