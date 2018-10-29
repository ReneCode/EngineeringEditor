const snap = (n, step) => {
  const cnt = n / step;
  const cntFull = Math.floor(cnt);
  if (cnt - cntFull < 0.5) {
    return cntFull * step;
  } else {
    return (cntFull + 1) * step;
  }
};

export { snap };
