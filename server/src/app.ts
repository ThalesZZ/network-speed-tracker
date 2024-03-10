import express from 'express'
import NetworkSpeedCheck from 'network-speed'
import NetworkService from './network/NetworkService'
import Database from './persistence/database'
import SpeedLogService from './persistence/speedlog/service'

const app = express()
const port = process.env.PORT || 3000

const database = new Database()
const speedLogService = new SpeedLogService(database)

const network = new NetworkSpeedCheck()
const networkService = new NetworkService(
  network,
  speedLogService,
  'https://www.google.com/',
  1e6, // 1 MB
  1e3, // 1 sec
)

speedLogService.data().then((data) => {
  console.log(`Collection currently contains ${data.length} events`)
  networkService.start()
})

app.get('/', (req, res) => {
  res.send('Running on port ' + port)
})

app.listen(port, () => {
  console.log('Listening to port ' + port)
})
