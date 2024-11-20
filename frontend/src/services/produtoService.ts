export const petService = {
    getAllProdutp: async () => {
        try {
            const response = await fetch('http://localhost:5000/produto')
            const produtos = await response.json()
            return produtos
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    getProdutoByID: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/produto/${id}`)
            const produto = await response.json()
            return produto
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    updateProduto: async(id: number, data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/produto/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    saveProduto: async (data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/produto`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    deleteProduto: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/produto/${id}`, {
                method: "DELETE",
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
            if(response){
                console.log('Produto deletado com sucesso')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}