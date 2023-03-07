import { Model } from 'objection'

export class Users extends Model {
    static get tableName() {
        return 'user';
    }

    static get idColumn() {
        return 'id';
    }
    
    static get relationMappings() {
        const Post = require('./posts.model');

        return {
            posts: {
                relation: Model.HasManyRrelation,
                modelClass: Post,
                join: {
                    from: 'user.id',
                    to: 'post.user_id'
                }
            }
        };
    }
}
