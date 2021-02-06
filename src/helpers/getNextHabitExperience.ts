import { ISuccess } from "features/profile/typings";
import { theme } from "theme";

const maxExp = 5;
const backgroundColors = [
  theme.background.gradient1,
  theme.background.gradientSuccess,
  theme.background.gradientSuccess2,
  theme.background.gradientSuccess3,
  theme.background.gradientSuccess4,
  theme.background.gradientSuccess5,
];

export const getNextHabitExperience = (success: ISuccess[], promise: number) =>
  success.reduce((acc, value) => {
    let addExp = 0;
    let count = value.count;

    if (count) {
      addExp = 1;
      while (count >= promise && addExp < maxExp) {
        count = count - promise;
        addExp++;
      }
    }
    return acc + addExp;
  }, 0);


export const getSuccessBackgroundColor = (promise: number, count?: number) => {
  if (!count) {
    return theme.palette.background.paper;
  }

  let colorIndex = 0;
  let colorCount = count;

  while (colorCount >= promise && colorIndex < maxExp) {
    colorCount = colorCount - promise;
    colorIndex++;
  }

  return backgroundColors[colorIndex] || theme.palette.background.paper;
};
