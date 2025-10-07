import moment from 'moment';

import Arrow from '../media/Arrow.png'

function WeekSwitcher({WeekVerhogen, WeekVerlagen, week, jaar}) {

  var jaar1 = moment(week).year()
  var jaar2 = moment(moment(week).endOf('isoWeek').toDate()).year()

  return (
    <div className='flex h-auto w-[280px] items-center'>
        <button className='w-[40px] h-[40px] rounded-full border-1 border-solid border-[#D0D0D0]' onClick={() => WeekVerlagen()}>
        <img src={Arrow} alt="" />
        </button>
        <div className='flex w-[120px] mx-[40px] flex-col items-center'>
            <p className='text-[20px] h-auto max-w-fit'>Week {moment(week).isoWeek()}</p>
            <p className='text-[15px] h-auto max-w-fit'>{jaar1 != jaar2 ? jaar1 + " - " + jaar2 : jaar1}</p>
        </div>
        <button className='w-[40px] h-[40px] rounded-full border-1 border-solid border-[#D0D0D0]' onClick={() => WeekVerhogen()}>
        <img src={Arrow} alt="" className='rotate-180'/>
        </button>
    </div>
  );
}

export default WeekSwitcher;
