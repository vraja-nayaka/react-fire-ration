import { ISuccess, IProfile } from "../features/profile/typings";
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

export const compareWithSet = (rows_1: IProfile[], rows_2: string[]) => {
    const friendUsers: IProfile[] = [];
    const otherUsers: IProfile[] = [];
    let set = new Set(rows_2);
    rows_1.forEach(row_1 => {
        set.has(row_1.userId) ? friendUsers.push(row_1) : otherUsers.push(row_1);
    });

    return {friendUsers, otherUsers};
};
