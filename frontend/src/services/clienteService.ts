export const clienteService = {
    getAllClientes: async () => {
        try {
            const response = await fetch('http://localhost:5000/cliente')
            const clientes = await response.json()
            return clientes
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    getClienteByID: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/cliente/${id}`)
            const cliente = await response.json()
            return cliente
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    saveCliente: async (data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/cliente`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    deleteCliente: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/cliente/${id}`, {
                method: "DELETE",
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
            if(response){
                console.log('Cliente deletado com sucesso')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}