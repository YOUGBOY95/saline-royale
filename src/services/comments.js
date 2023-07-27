import axios from 'axios';

const commentUrlService = axios.create({ 
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/API/' 
});

const commentService = {
    getComments: async () => {
        const response = await commentUrlService.get('/comments');
        return response.data;
    },

    getComment: async (id) => {
        const response = await commentUrlService.get(`/comment/${id}`);
        return response.data;
    },

    createComment: async (user_id, page, lesson_id, content, created_at, updated_at) => {
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('page', page);
        formData.append('lesson_id', lesson_id);
        formData.append('content', content);
        formData.append('created_at', created_at);
        formData.append('updated_at', updated_at);

        const response = await commentUrlService.post('/comment/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        return response.data;
    },

    updateComment: async (id, content, updated_at) => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('updated_at', updated_at);

        const response = await commentUrlService.put(`/comment/${id}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        return response.data;
    },

    deleteComment: async (id) => {
        const response = await commentUrlService.delete(`/comment/${id}/delete`);
        return response.data;
    },
}

export default commentService