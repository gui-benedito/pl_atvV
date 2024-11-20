export const compraService = {
    saveCompra: async (data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/compra`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}