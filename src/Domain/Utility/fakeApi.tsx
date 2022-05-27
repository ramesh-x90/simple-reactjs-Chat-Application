async function getItem(
  count: number,
  setData: (data: any[]) => void,
  progress?: (prograss: number) => void
) {
  let result = Array<number>();
  for (let i = 0; i <= count; i++) {
    await delay(50);

    const a = (i * 100) / count;

    if (progress) progress(a);
    result.push(Math.random());
  }
  await delay(100);
  setData(result);
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, ms);
  });
}

export default getItem;
