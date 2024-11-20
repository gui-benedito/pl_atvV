export const petService = {
    getAllProdutp: async () => {
        try {
            const response = await fetch('http://localhost:5000/servico')
            const servicos = await response.json()
            return servicos
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    getServicoByID: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/servico/${id}`)
            const servico = await response.json()
            return servico
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    updateServico: async(id: number, data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/servico/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    saveServico: async (data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/servico`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    deleteServico: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/servico/${id}`, {
                method: "DELETE",
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
            if(response){
                console.log('Servicço deletado com sucesso')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}