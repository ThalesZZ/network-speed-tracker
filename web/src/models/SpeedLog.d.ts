export interface SpeedLogEvent {
  _id: string
  url: string
  file_size_bytes: number
  timestamp: number
  value: number
  uom: 'bps' | 'kbps' | 'mbps'
  type: 'download' | 'upload'
}
