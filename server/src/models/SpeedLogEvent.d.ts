import { ObjectId, WithId } from 'mongodb'

export interface SpeedLogEventProps {
  _id?: ObjectId
  url: string
  file_size_bytes: number
  timestamp: number
  value: number
  uom: 'bps' | 'kbps' | 'mbps'
  type: 'download' | 'upload'
}

export type SpeedLogEvent = WithId<SpeedLogEventProps>
