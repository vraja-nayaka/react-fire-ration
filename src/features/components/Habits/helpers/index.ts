import { ISuccess } from "../../../profile/typings";
import moment from 'moment';

export const getNewSucces = ( success: ISuccess[]) => {
    const newSuccess = [] as ISuccess[];
    const lastDate = success[success.length - 1].day;
    const difference = moment().startOf('day').diff(moment(lastDate).startOf('day'), 'day');

    for (let i = 0; i < difference; i++) {
        newSuccess.push({
            day: moment(lastDate).add(i + 1, 'day').unix() * 1000,
        });
    }
    return [...success, ...newSuccess];
};
