import SpeedLogService from './service'
import { FastifyInstance } from 'fastify'

export default class SpeedLogController {
  private readonly PATH = 'speedlog'
  private readonly service: SpeedLogService

  constructor(service: SpeedLogService) {
    this.service = service
  }

  private path = (route: string): string => '/' + [this.PATH, route].join('/')

  routes = async (app: FastifyInstance): Promise<void> => {
    app.get(this.path('data'), async () => {
      console.log('caralho')
      const data = await this.service.data()
      console.log(data)
      return data
    })
  }
}
