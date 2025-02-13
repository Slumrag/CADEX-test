import type { VercelRequest, VercelResponse } from '@vercel/node';
type Values = {
  height: number;
  width: number;
  length: number;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { length, width, height } = req.query;

  const boxDims: Values = { length: Number(length), width: Number(width), height: Number(height) };

  if (Number.isNaN(boxDims.length) || Number.isNaN(boxDims.width) || Number.isNaN(boxDims.height)) {
    res.status(400);
    res.statusMessage = 'invalid dimensions';
    return res;
  }
  try {
    const geometry = getBufferGeometry(boxDims);
    return res.json(geometry);
  } catch {
    res.status(500);

    return res;
  }
}

function getBufferGeometry({ height, width, length }: Values) {
  const halfLength = length / 2;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const points = [
    [-halfLength, -halfWidth, -halfHeight], //0
    [halfLength, -halfWidth, -halfHeight], //1
    [halfLength, halfWidth, -halfHeight], //2
    [-halfLength, halfWidth, -halfHeight], //3
    // //top
    [-halfLength, -halfWidth, -halfHeight], //4
    [halfLength, -halfWidth, halfHeight], //5
    [halfLength, halfWidth, halfHeight], //6
    [-halfLength, halfWidth, halfHeight], //7
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
