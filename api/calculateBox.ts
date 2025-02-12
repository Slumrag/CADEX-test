import type { VercelRequest, VercelResponse } from '@vercel/node';
type Values = {
  height: number;
  width: number;
  length: number;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { length, width, height } = req.query;

  const boxDims: Values = { length: Number(length), width: Number(width), height: Number(height) };

  if (!boxDims.length || !boxDims.width || !boxDims.height) {
    res.status(400).statusMessage = 'Incorrect dimensions';
    return res;
  }

  const geometry = getBufferGeometry(boxDims);
  return res.json(geometry);
}

function getBufferGeometry({ height, width, length }: Values) {
  const points = [
    [0, 0, 0], //0
    [length, 0, 0], //1
    [length, width, 0], //2
    [0, width, 0], //3
    // //top
    [0, 0, height], //4
    [length, 0, height], //5
    [length, width, height], //6
    [0, width, height], //7
  ];
  const getVertex = (indexes: number[]) => {
    const vertex: number[][] = [];
    indexes.forEach((el) => {
      if (points[el]) {
        vertex.push(points[el]);
      }
    });
    return vertex;
  };
  const vertices = [
    // bottom
    ...getVertex([3, 1, 0]), //v0
    ...getVertex([3, 2, 1]), //v1
    // top
    ...getVertex([4, 5, 6]), //v2
    ...getVertex([4, 6, 7]), //v3
    // forward
    ...getVertex([0, 4, 7]), // v4
    ...getVertex([0, 7, 3]), // v5
    // back
    ...getVertex([1, 2, 5]), // v6
    ...getVertex([5, 2, 6]), // v7
    // right
    ...getVertex([3, 6, 2]), // v8
    ...getVertex([6, 3, 7]), // v9
    // left
    ...getVertex([1, 4, 0]), // v10
    ...getVertex([1, 5, 4]), // v11
  ];

  return vertices.reduce((acc, cur) => [...acc, ...cur]);
}
