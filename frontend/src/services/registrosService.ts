export const registrosService = {
    getTopCinco: async () => {
        try {
            const response = await fetch('http://localhost:5000/registros/topCinco')
            const registro = await response.json()
            return registro
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}