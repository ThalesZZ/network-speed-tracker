import { ObjectId } from 'mongodb'

export type SpeedLogEvent = {
  _id?: ObjectId
  url: string
  file_size_bytes: number
  type: 'download' | 'upload'
  timestamp: number
  value: number
  uom: 'bps' | 'kbps' | 'mbps'
}
