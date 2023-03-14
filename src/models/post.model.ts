import { Schema, model } from 'mongoose'
import Post from '@/interfaces/post.interface'

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const PostModel = model<Post>("Post", PostSchema)

export default PostModel;