import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Ensure the method is POST
  if (req.method === 'POST') {
    try {
      // Path to save the screenshot
      const filePath = path.join(process.cwd(), 'public', 'screenshot.png');

      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));

      req.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        // Save the file to the specified path
        try {
          fs.writeFileSync(filePath, buffer);
          res.status(200).json({ message: 'Screenshot saved successfully!' });
        } catch (fileError) {
          console.error('Error saving the file:', fileError);
          res.status(500).json({ error: 'Failed to save the screenshot' });
        }
      });

    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Server error when processing the file.' });
    }
  } else {
    // If the method is not POST, respond with Method Not Allowed
    res.status(405).json({ message: 'Method not allowed' });
  }
}
