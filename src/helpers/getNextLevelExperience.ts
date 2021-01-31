const levelsReqExp = [
  12, 30, 60, 106,
  // next 6
  180, 280, 396, 512, 700,
  // next 11
  920, 1180, 1356, 1600, 2104
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
