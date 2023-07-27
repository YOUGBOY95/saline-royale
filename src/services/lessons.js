import axios from 'axios'

const lessonService = axios.create({
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/',
})

const lessonsService = {
    getLessons: async () => {
        const response = await lessonService.get('API/lessons')
        return response.data
    },

    findLesson: (id) => {
        const response = lessonService.get(`API/lesson/${id}`)
        return response.data
    },

    createLesson: (
        title,
        date,
        subtitle_id,
        teacher_id,
        composer_id,
        instrument_id,
        image,
        status
    ) => {
        lessonService.post(
            'API/lesson/create',
            {
                title: title,
                date: date,
                subtitle_id: subtitle_id,
                teacher_id: teacher_id,
                composer_id: composer_id,
                instrument_id: instrument_id,
                image: image,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updateLesson: async (
        lesson_id,
        title,
        date,
        subtitle_id,
        teacher_id,
        composer_id,
        instrument_id,
        image,
        status
    ) => {
        await lessonService.patch(
            `API/lesson/${lesson_id}/update`,
            {
                title: title,
                date: date,
                subtitle_id: subtitle_id,
                teacher_id: teacher_id,
                composer_id: composer_id,
                instrument_id: instrument_id,
                image: image,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deleteLesson: (id) => {
        lessonService.delete(`API/lesson/${id}/delete`)
    },
}

export default lessonsService
