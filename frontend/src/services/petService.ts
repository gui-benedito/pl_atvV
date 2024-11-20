export const petService = {
    getAllPets: async () => {
        try {
            const response = await fetch('http://localhost:5000/pet')
            const pets = await response.json()
            return pets
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    getPetByID: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/pet/${id}`)
            const pet = await response.json()
            return pet
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    updatePet: async(id: number, data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/pet/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    savePet: async (data: any) => {
        try {
            const response = await fetch(`http://localhost:5000/pet`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    deletePet: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/pet/${id}`, {
                method: "DELETE",
                headers: {"Content-type": "application/json; charset=UTF-8"}
              })
            if(response){
                console.log('Pet deletado com sucesso')
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}