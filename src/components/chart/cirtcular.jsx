import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatNumber } from '../../helpers';

export const CirtcularPercents = ({ percentage, count, text }) => {
    return <CircularProgressbarWithChildren value={percentage} >
        <div className="text-center text-4xl font-bold">{formatNumber(count, 2)}</div>
        <div className="mt-1 text-lg text-center">
            {text}
        </div>
    </CircularProgressbarWithChildren>;

}