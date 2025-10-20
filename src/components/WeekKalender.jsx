import moment from 'moment';
import WeekdKalenderDag from './WeekKalenderDag';

function WeekKalender({weekDagen, rol}) {
    const DagIsWeekend = (datum) => {
        if(moment(datum).day() == 6){
            return true;
        }
        if(moment(datum).day() == 0){
            return true;
        }
        return false;
    }

  return (
    <div className="flex flex-row bg-[#ff0000] flex-col w-full h-full">
        {weekDagen.map((dag, index) => (
            <WeekdKalenderDag key={dag} dag={dag} index={index} rol={rol} DagIsWeekend={DagIsWeekend}/>
        ))}
    </div>
  );
}

export default WeekKalender


