// const levels = {
//     1: {
//         exp: 20,
//     },
//     2: {
//         exp: 60,
//     },
//     3: {
//         exp: 120,
//     },
// }

const levels = [20, 60, 110, 200]

export const getNextLevelExperience = (exp: number) => {
    let level = 1;
    levels.forEach((v, i) => {
        if (exp >= v) {
            level = i + 1;
        }
    });

    return levels[level - 1];
}