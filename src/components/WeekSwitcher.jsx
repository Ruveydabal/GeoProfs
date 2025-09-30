import moment from 'moment';

import Arrow from '../media/Arrow.png'

function WeekSwitcher({datum, SetDatum}) {
  return (
    <div className='flex h-auto w-[280px] items-center'>
        <button className='w-[40px] h-[40px] rounded-full border-1 border-solid border-[#D0D0D0]' onClick={() => SetDatum(moment(datum).subtract(7, 'days'))}>
        <img src={Arrow} alt="" />
        </button>
        <div className='flex w-[120px] mx-[40px] flex-col items-center'>
            <p className='text-[20px] h-auto max-w-fit'>Week {moment(datum).isoWeek()}</p>
            <p className='text-[15px] h-auto max-w-fit'>{moment(datum).format('YYYY')}</p>
        </div>
        <button className='w-[40px] h-[40px] rounded-full border-1 border-solid border-[#D0D0D0]' onClick={() => SetDatum(moment(datum).add(7, 'days'))}>
        <img src={Arrow} alt="" className='rotate-180'/>
        </button>
    </div>
  );
}

export default WeekSwitcher;
