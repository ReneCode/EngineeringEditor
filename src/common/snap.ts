const _snap = (n: number, step: number): number => {
  const cnt: number = n / step;
  const cntFull: number = Math.floor(cnt);
  if (cnt - cntFull < 0.5) {
    return cntFull * step;
  } else {
    return (cntFull + 1) * step;
  }
};

const snap = (n: number, step: number): number => {
  return Math.round(n / step) * step;
};

export { snap };
