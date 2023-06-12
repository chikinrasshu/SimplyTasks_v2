interface IPost {
    id: number,
    user_id: number,
    name: string,
    desc: string,
    from: Date,
    until: Date,
    priority: number,
    completed: boolean
};

export default IPost;