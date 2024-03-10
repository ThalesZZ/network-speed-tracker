import NetworkSpeedCheck from 'network-speed'
import { SpeedLogEventProps } from '../models/SpeedLogEvent'
import SpeedLogService from '../persistence/speedlog/service'

export default class NetworkService {
  readonly network: NetworkSpeedCheck
  readonly speedLogService: SpeedLogService
  readonly url: string
  readonly fileSizeBytes: number
  readonly frequency: number

  constructor(
    network: NetworkSpeedCheck,
    speedLogService: SpeedLogService,
    url: string,
    fileSizeBytes: number,
    frequency: number,
  ) {
    this.network = network
    this.speedLogService = speedLogService
    this.url = url
    this.fileSizeBytes = fileSizeBytes
    this.frequency = frequency
  }

  private trackDownloadSpeed = async (): Promise<void> => {
    const speed = await this.network.checkDownloadSpeed(
      this.url,
      this.fileSizeBytes,
    )
    const uom = 'bps'
    const value = +speed[uom]
    const event: SpeedLogEventProps = {
      value,
      uom,
      url: this.url,
      file_size_bytes: this.fileSizeBytes,
      type: 'download',
      timestamp: new Date().getTime(),
    }

    const result = await this.speedLogService.add(event)
    console.log(result)
  }

  async start(resetCollection?: boolean): Promise<void> {
    if (resetCollection) {
      await this.speedLogService.drop()
      console.log('Reseted collection!')
    }

    setInterval(this.trackDownloadSpeed, this.frequency)
  }
}
