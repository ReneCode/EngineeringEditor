const containsTheSame = (arr1: any[], arr2: any[]): boolean => {
  if (!arr1 || !arr2) {
    return false;
  }

  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i1 of arr1) {
    if (!arr2.includes(i1)) {
      return false;
    }
  }

  return true;
};

export default containsTheSame;
