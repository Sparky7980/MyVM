import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Check for POST request
  if (req.method === 'POST') {
    try {
      // Path to save the screenshot (make sure the 'public' folder exists)
      const filePath = path.join(process.cwd(), 'public', 'screenshot.png');

      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));

      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        // Save the screenshot as a .png file
        fs.writeFileSync(filePath, buffer);
        
        // Respond with success message
        res.status(200).json({ message: 'Screenshot saved successfully!' });
      });
    } catch (error) {
      console.error('Error saving screenshot:', error);
      res.status(500).json({ error: 'Server error when processing the file.' });
    }
  } else {
    // Respond with Method Not Allowed if not a POST request
    res.status(405).json({ message: 'Method not allowed' });
  }
}
