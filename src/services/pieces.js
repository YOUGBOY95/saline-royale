import axios from 'axios'

const pieceService = axios.create({
    baseURL: 'http://w2-groupe6.hetic-projects.arcplex.tech:8090/',
})

const piecesService = {
    getPieces: async () => {
        const response = await pieceService.get('API/pieces')
        return response.data
    },

    findPiece: (id) => {
        const response = pieceService.get(`API/piece/${id}`)
        return response.data
    },

    createPiece: (name, description, composer_id) => {
        pieceService.post(
            'API/piece/create',
            {
                name: name,
                description: description,
                composer_id: composer_id,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    updatePiece: async (piece_id, name, description, composer_id) => {
        await pieceService.patch(
            `API/piece/${piece_id}/update`,
            {
                name: name,
                description: description,
                composer_id: composer_id,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    },

    deletePiece: (id) => {
        pieceService.delete(`API/piece/${id}/delete`)
    },
}

export default piecesService
