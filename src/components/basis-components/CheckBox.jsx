       function Checkbox({id, checked, defaultChecked, onChange}) {
       
         return (
            <div className="flex gap-2 items-start">
                <div className="grid place-items-center mt-1">
                    <input type="checkbox" id={id} defaultChecked={defaultChecked} value={checked} onChange={onChange}
                    className="
                        peer
                        col-start-1 row-start-1
                        appearance-none cursor-pointer w-[20px] h-[20px] border-1 border-solid border-[#D0D0D0] rounded-[5px]
                    "
                    />
                    <div
                        className="
                            pointer-events-none
                            col-start-1 row-start-1
                            w-[12px] h-[12px] peer-checked:bg-[#D0D0D0] rounded-[3px]
                        "
                        />
                </div>
            </div>
         );
       }
       export default Checkbox;
       
       
       
