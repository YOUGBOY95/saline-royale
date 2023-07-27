import axios from 'axios'

const teacherService = axios.create({
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/',
})

const teachersService = {
    getTeachers: async () => {
        const response = await teacherService.get('API/teachers')
        return response.data
    },

    findUser: (id) => {
        const response = teacherService.get(`API/teacher/${id}`)
        return response.data
    },

    createTeacher: (firstname, lastname, email, biography, instrument_id) => {
        teacherService.post(
            'API/teacher/create',
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                biography: biography,
                instrument_id: instrument_id,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updateTeacher: async (teacher_id, firstname, lastname, email, biography, instrument_id) => {
        await teacherService.patch(
            `API/teacher/${teacher_id}/update`,
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                biography: biography,
                instrument_id: instrument_id,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deleteTeacher: (id) => {
        teacherService.delete(`API/teacher/${id}/delete`)
    },
}

export default teachersService
