import axios from 'axios'

const userService = axios.create({ baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/' })

const usersService = {
    getUsers: async () => {
        const response = await userService.get('API/users')
        return response.data
    },

    findUser: (id) => {
        const response = userService.get(`API/user/${id}`)
        return response.data
    },

    createUser: (firstname, lastname, email, password, role) => {
        userService.post(
            'API/user/create',
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updateUser: async (id, firstname, lastname, email, password, role) => {
        await userService.patch(
            `API/user/${id}/update`,
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deleteUser: (id) => {
        userService.delete(`API/user/${id}/delete`)
    },

    authentification: async (email, password) => {
        const response = await userService.get('API/users')
        const filteredRes = response.data.filter(
            (user) => user.email === email && user.password === password
        )
        return filteredRes[0]
    },
}

export default usersService
