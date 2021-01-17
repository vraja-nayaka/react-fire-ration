const pathsMap = {
  '/profile': 0,
  '/friends': 1,
}

export const pathsKeys = Object.keys(pathsMap);

type pathsType = keyof typeof pathsMap;

export const getSwipeableIndexByPath = (path: string) => {
  if (pathsKeys.includes(path)) {
    return pathsMap[path as pathsType];
  }
};
