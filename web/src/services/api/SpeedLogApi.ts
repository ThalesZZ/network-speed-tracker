import { SpeedLogEvent } from '@/models/SpeedLog'
import { api } from './lib'
import path from './utils/path'

export default class SpeedLogApi {
  static INSTANCE = new SpeedLogApi()
  private readonly PATH = 'speedlog'

  private constructor() {
    if (SpeedLogApi.INSTANCE) return SpeedLogApi.INSTANCE
    SpeedLogApi.INSTANCE = this
  }

  async data(): Promise<SpeedLogEvent[]> {
    return api.get(path(this.PATH, 'data')).then((response) => {
      if (response.status !== 200) throw new Error('Could not fetch logs')
      return response.data
    })
  }
}
