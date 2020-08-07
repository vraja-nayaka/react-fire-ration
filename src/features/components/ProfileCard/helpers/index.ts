const levels = [20, 60, 110, 200, 380, 500, 800]

export const getNextLevelExperience = (exp: number) => {
    let level = 1;
    
    levels.forEach((v, i) => {
        if (exp >= v) {
            level++;
        }
    });

    const nextLevelExperience = levels[level - 1];
    const prevLevelExperience = levels[level - 2] || 0;
    const experienceProgress = (exp - prevLevelExperience) / (nextLevelExperience - prevLevelExperience) * 100 

    return {
        level,
        experienceProgress,
        nextLevelExperience,
    };
}