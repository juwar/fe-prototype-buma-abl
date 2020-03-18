import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Post extends Model {
    static table = 'request'

    // @field('_id')
    // _id

    // @field('createdAt')
    // createdAt

    @field('judulRequest')
    judulRequest

    @field('tipeRequest')
    tipeRequest

    @field('alasan')
    alasan
}