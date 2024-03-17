import fastify from 'fastify'
import cors from '@fastify/cors'
import NetworkSpeedCheck from 'network-speed'
import NetworkService from './network/NetworkService'
import Database from './persistence/database'
import SpeedLogService from './persistence/speedlog/service'
import SpeedLogController from './persistence/speedlog/controller'

const port = 3030

const database = new Database()
const speedLogService = new SpeedLogService(database)
const speedLogController = new SpeedLogController(speedLogService)

const network = new NetworkSpeedCheck()
const networkService = new NetworkService(
  network,
  speedLogService,
  {
    url: 'https://www.google.com/',
    fileSizeBytes: 1e6,
    uom: 'bps',
    frequency: 1e3,
  },
  {
    url: 'www.google.com',
    fileSizeBytes: 1e6,
    uom: 'bps',
    frequency: 1e3,
  },
)

speedLogService.data().then((data) => {
  console.log(`Collection currently contains ${data.length} events.`)
  networkService
    .start()
    .then(() => console.log('Network Speed Tracker started.'))
})

const app = fastify()
app.register(cors, { origin: true })
app.register(speedLogController.routes)

app.get('/', (req, res) => {
  res.send('Running on port ' + port)
})

app.listen({ port }).then(() => {
  console.log('Listening to port ' + port)
})
