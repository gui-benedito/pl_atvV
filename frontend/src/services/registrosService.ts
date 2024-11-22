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
    },
    getTopDez: async () => {
        try {
            const response = await fetch('http://localhost:5000/registros/topDez')
            const registro = await response.json()
            console.log(registro)
            return registro
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}