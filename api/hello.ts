import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World' } = req.query;
  if (name === 'error') {
    return res.status(400).send('error');
  }
  return res.json({
    message: `Hello ${name}!`,
  });
}
