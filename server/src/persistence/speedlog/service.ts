import { Collection } from 'mongodb'
import { SpeedLogEvent, SpeedLogEventProps } from '../../models/SpeedLogEvent'
import Database from '../database'

export default class SpeedLogService {
  private static readonly COLLECTION = 'speed_logs'
  private readonly database: Database

  constructor(database: Database) {
    this.database = database
  }

  private async collection(): Promise<Collection<SpeedLogEvent>> {
    return this.database.collection(SpeedLogService.COLLECTION)
  }

  async add(evt: SpeedLogEventProps): Promise<SpeedLogEvent> {
    const timestampedEvent: SpeedLogEvent = { ...evt, _id: undefined }
    // TODO validate with zod

    const collection = await this.collection()
    const { insertedId: _id } = await collection.insertOne(timestampedEvent)
    return { ...timestampedEvent, _id }
  }

  async data(): Promise<SpeedLogEvent[]> {
    const collection = await this.collection()
    return collection.find().toArray()
  }

  async drop(): Promise<boolean> {
    console.error('wont drop it >:(')
    return Promise.reject(new Error())
    // const collection = await this.collection()
    // return collection.drop()
  }
}
