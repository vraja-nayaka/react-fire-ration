const levelsReqExp = [
  20, 60, 110, 204,
  // next 6
  382, 506, 814, 1216, 1680,
  // next 11
  2200, 2862, 3906, 5542, 7980
  // next 16
];

// TODO: use some constructor like:
// const levelup = (level: number) => (level * 4) + 10 * Math.floor(level ** 2.2);

export const getNextLevelExperience = (exp: number) => {
  let level = 1;

  for (let boundary = 0; exp >= levelsReqExp[boundary]; boundary++) {
    level++;
  }

  const nextLevelExperience = levelsReqExp[level - 1];
  const prevLevelExperience = levelsReqExp[level - 2] || 0;
  const experienceProgress = (exp - prevLevelExperience) / (nextLevelExperience - prevLevelExperience) * 100

  return {
    level,
    experienceProgress,
    nextLevelExperience,
  };
};
