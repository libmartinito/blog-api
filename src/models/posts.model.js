import { Model } from 'objection'

export class Posts extends Model {
    static get tableName() {
        return 'post';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const User = require('./users.model');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'post.user_id',
                    to: 'user.id'
                }
            }
        };
    }
}

