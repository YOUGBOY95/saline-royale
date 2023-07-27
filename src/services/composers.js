import axios from 'axios'

const composerService = axios.create({
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/',
})

const composersService = {
    getComposers: async () => {
        const response = await composerService.get('API/composers')
        return response.data
    },

    findComposer: (id) => {
        const response = composerService.get(`API/composer/${id}`)
        return response.data
    },

    createComposer: (firstname, lastname, description) => {
        composerService.post(
            'API/composer/create',
            {
                firstname: firstname,
                lastname: lastname,
                description: description,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updateComposer: async (composer_id, firstname, lastname, description) => {
        await composerService.patch(
            `API/composer/${composer_id}/update`,
            {
                firstname: firstname,
                lastname: lastname,
                description: description,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deleteComposer: (id) => {
        composerService.delete(`API/composer/${id}/delete`)
    },
}

export default composersService
