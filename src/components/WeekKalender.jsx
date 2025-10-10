import moment from 'moment';
import WeekdKalenderDag from './WeekKalenderDag';

function WeekKalender({weekDagen}) {
    //tijdelijke variabelen
    var managerRol = true;

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
            <WeekdKalenderDag key={dag} dag={dag} index={index} managerRol={managerRol} DagIsWeekend={DagIsWeekend}/>
        ))}
    </div>
  );
}

export default WeekKalender


