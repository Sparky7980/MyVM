export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { action, target } = req.body;
  
      // Replace with your Laptop B's IP address
      const laptopBEndpoint = 'http://laptop-b-ip:5000/action';
  
      try {
        const response = await fetch(laptopBEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, target }),
        });
  
        if (!response.ok) throw new Error('Failed to send action to Laptop B');
  
        res.status(200).json({ message: 'Action sent to Laptop B' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error forwarding action' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
