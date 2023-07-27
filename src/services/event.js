import axios from 'axios'

const eventService = axios.create({
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/',
})

const eventsService = {
    getEvents: async () => {
        const response = await eventService.get('API/events')
        return response.data
    },

    findEvent: (id) => {
        const response = eventService.get(`API/event/${id}`)
        return response.data
    },

    createEvent: (date, description, teacher_id, status) => {
        eventService.post(
            'API/event/create',
            {
                date: date,
                description: description,
                teacher_id: teacher_id,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updateEvent: async (event_id, date, description, teacher_id, status) => {
        await eventService.patch(
            `API/event/${event_id}/update`,
            {
                date: date,
                description: description,
                teacher_id: teacher_id,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deleteEvent: (id) => {
        eventService.delete(`API/event/${id}/delete`)
    },
}

export default eventsService
