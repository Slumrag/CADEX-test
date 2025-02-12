type Values = {
  height: number;
  width: number;
  length: number;
};

export async function getBufferGeometry({ height, width, length }: Values) {
  try {
    const url = '/api/calculateBox';

    const params = `?length=${length}&height=${height}&width=${width}`;

    const res = await fetch(url + params, { method: 'GET' });
    const result = res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
