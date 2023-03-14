import PostModel from "@/models/post.model"
import Post from '@/interfaces/post.interface'

class PostService {
    private post = PostModel
    public async create (title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body })
            return post
        } catch (error) {
            throw new Error('Unable to Create Post')
        }
    }
}


export default PostService