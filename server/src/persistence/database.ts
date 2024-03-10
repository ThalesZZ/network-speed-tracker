import { Collection, Db, MongoClient } from 'mongodb'
import { SpeedLogEvent } from '../../../models/SpeedLogEvent'

export default class Database {
  private readonly URI = 'mongodb://localhost:27017'
  private readonly DB_NAME = 'NetworkTracker'
  private readonly client: MongoClient

  constructor() {
    try {
      this.client = new MongoClient(this.URI)
      this.client.connect()
    } catch (e) {
      throw new Error('Error trying to connect database: ' + e)
    }
  }

  async database(): Promise<Db> {
    try {
      return this.client.db(this.DB_NAME)
    } catch (e) {
      throw new Error('Error trying to fetch database: ' + e)
    }
  }

  async collection(name: string): Promise<Collection<SpeedLogEvent>> {
    const database = await this.database()
    return database.collection(name)
  }
}
