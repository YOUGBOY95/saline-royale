import axios from 'axios'

const fileService = axios.create({
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/',
})

const filesService = {
    getFiles: async () => {
        const response = await fileService.get('API/files')
        return response.data
    },

    findFile: (id) => {
        const response = fileService.get(`API/file/${id}`)
        return response.data
    },

    createFile: (url, type, date, event_id, lesson_id, status) => {
        fileService.post(
            'API/file/create',
            {
                url: url,
                type: type,
                date: date,
                event_id: event_id,
                lesson_id: lesson_id,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updateFile: async (file_id, url, type, status) => {
        await fileService.patch(
            `API/file/${file_id}/update`,
            {
                url: url,
                type: type,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deleteFile: (id) => {
        fileService.delete(`API/file/${id}/delete`)
    },
}

export default filesService
