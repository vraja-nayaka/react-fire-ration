import { ISuccess } from "../features/profile/typings";
import moment from 'moment';

export const getFullSuccess = (params: ISuccess[]) => {
    const success = [...params];
    const lastDate = params[params.length - 1].day;
    const difference = moment().startOf('day').diff(moment(lastDate).startOf('day'), 'day');

    for (let i = 0; i < difference; i++) {
        success.push({
            day: moment(lastDate).add(i + 1, 'day').unix() * 1000,
        });
    }

    return success;
};