import NetworkSpeedCheck from 'network-speed'
import { SpeedLogEventProps } from '../models/SpeedLogEvent'
import SpeedLogService from '../persistence/speedlog/service'

export type NetworkRequestOptions = {
  url: string
  fileSizeBytes: number
  uom: SpeedLogEventProps['uom']
  frequency: number
}

export default class NetworkService {
  private readonly network: NetworkSpeedCheck
  private readonly speedLogService: SpeedLogService
  readonly downloadOptions: NetworkRequestOptions
  readonly uploadOptions: NetworkRequestOptions

  constructor(
    network: NetworkSpeedCheck,
    speedLogService: SpeedLogService,
    downloadOptions: NetworkRequestOptions,
    uploadOptions: NetworkRequestOptions,
  ) {
    this.network = network
    this.speedLogService = speedLogService
    this.downloadOptions = downloadOptions
    this.uploadOptions = uploadOptions
  }

  private async speedLogEventFactory(
    type: SpeedLogEventProps['type'],
    { fileSizeBytes: file_size_bytes, ...options }: NetworkRequestOptions,
    measures: ReturnType<NetworkSpeedCheck['checkDownloadSpeed']>,
  ): Promise<SpeedLogEventProps> {
    const { url, uom } = options
    const value = +(await measures)[uom]
    const timestamp = new Date().getTime()
    return { type, value, uom, url, file_size_bytes, timestamp }
  }

  private trackDownloadSpeed = async (): Promise<void> => {
    const options = this.downloadOptions
    const event = await this.speedLogEventFactory(
      'download',
      options,
      this.network.checkDownloadSpeed(options.url, options.fileSizeBytes),
    )
    const result = await this.speedLogService.add(event)
    // console.log(result)
  }

  private trackUploadSpeed = async (): Promise<void> => {
    const options = this.uploadOptions
    const event = await this.speedLogEventFactory(
      'upload',
      options,
      this.network.checkUploadSpeed(
        {
          hostname: options.url,
          port: 80,
          path: '/catchers/544b09b4599c1d0200000289',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
        options.fileSizeBytes,
      ),
    )
    const result = await this.speedLogService.add(event)
    // console.log(result)
  }

  async start(resetCollection?: boolean): Promise<void> {
    if (resetCollection) {
      await this.speedLogService.drop()
      console.log('Reseted collection!')
    }

    setInterval(() => {
      try {
        this.trackDownloadSpeed()
      } catch (e) {
        console.error(e)
      }
    }, this.downloadOptions.frequency)

    // setInterval(() => {
    //   try {
    //     this.trackUploadSpeed()
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }, this.uploadOptions.frequency)
  }
}
