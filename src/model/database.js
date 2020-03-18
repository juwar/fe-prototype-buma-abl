import Request from './Request'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './schema'

const adapter = new SQLiteAdapter({
    dbName: 'WatermelonDemo',
    schema: mySchema,
})

const database = new Database({
    // ...
    adapter,
    modelClasses: [Request],
    actionsEnabled: true, 
})

export default database;