import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'request',
      columns: [
        // {name: '_id', type: 'string'},
        // {name: 'createdAt', type: 'string'},
        {name: 'judulRequest', type: 'string'},
        {name: 'tipeRequest', type: 'string'},
        {name: 'alasan', type: 'string'},
      ],
    }),
  ],
});
