let token = null

const notes = [
  {
    id: "5a451df7571c224a31b5c8ce",
    Title: "Mocktesti1",
    Author: "MockTestaaja1",
    likes: 1,
    user: {
      _id: "5a968c0d31edb662f9f3e8e6",
      username: "kayttajaa",
      name: "kayttajaa"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    Title: "Mocktesti2",
    Author: "MockTestaaja2",
    likes: 2,
    user: {
      _id: "5a968c0d31edb662f9f3e8e6",
      username: "kayttajaa",
      name: "kayttajaa"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    Title: "Mocktesti3",
    Author: "MockTestaaja3",
    likes: 3,
    user: {
      _id: "5a968c0d31edb662f9f3e8e6",
      username: "kayttajaa",
      name: "kayttajaa"
    }
  }
]

const getAll = () => {
  return Promise.resolve(notes)
}

export default { getAll, notes }