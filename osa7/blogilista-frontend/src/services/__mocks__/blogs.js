let token = null

const blogs = [
  {
    _id: '5a451df7571c224a31b5c8ce',
    title: 'Ensimmäinen blogi paras blogi',
    author: 'Maija',
    url: 'http://maijanblogi.com',
    likes: 87,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mmmaija',
      name: 'Maija Meikäläinen'
    }
  },
  {
    _id: '5a451e21e0b8b04a45638211',
    title: 'Blogi kaiken turhuudesta',
    author: 'Turhamo',
    url: 'http://turhuus.com',
    likes: 0,
    user: {
      _id: '5a437a9e514ab7f168ddf139',
      username: 'Turhamo',
      name: 'Barack Obama'
    }
  },
  {
    _id: '5a451e30b5ffd44a58fa79ab',
    title: 'Elämä on ihanaa',
    author: 'Maija',
    url: 'http://elämästä.fi',
    likes: 92,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mmmaija',
      name: 'Maija Meikäläinen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  token = null
}

export default { getAll, blogs, setToken }