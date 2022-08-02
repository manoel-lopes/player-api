import { app } from './config/app'

const PORT = 3000
app.listen(PORT, () =>
  console.log(`The server is running on http://localhost:${PORT}`)
)
