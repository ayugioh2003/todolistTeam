import http from 'http';
import app from './app.js'
const PORT = process.env.PORT || 3005


const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

