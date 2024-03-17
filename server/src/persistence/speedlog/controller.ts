import { SpeedLogEvent } from '../../models/SpeedLogEvent'
import SpeedLogService from './service'
import { Express, Request, Response } from 'express'

export default class SpeedLogController {
  private readonly PATH = 'speedlog'
  private readonly service: SpeedLogService

  constructor(service: SpeedLogService) {
    this.service = service
  }

  private path = (route: string): string => '/' + [this.PATH, route].join('/')

  register(app: Express): void {
    app.get(this.path('data'), this.data)
  }

  data = async (
    req: Request,
    res: Response<SpeedLogEvent[]>,
  ): Promise<void> => {
    const data = await this.service.data()
    res.send(data)
  }
}
