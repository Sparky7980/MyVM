import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'public', 'screenshot.png');

    // Save the uploaded file
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(filePath, buffer);
      res.status(200).json({ message: 'Screenshot saved' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
