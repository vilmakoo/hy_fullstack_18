const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, usersInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(initialBlogs.length)

    const returnedTitles = response.body.map(b => b.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })
})

describe.only('addition of a new blog', async () => {
  try {
    const login = await api.post('/api/login')
      .set('Content-Type', /application\/json/)
      .send({
        username: 'root',
        password: 'sekred'
      })
    console.log(login)
  } catch (e) {
    console.log(e.message)
  }

  test('POST /api/blogs succeeds with valid data', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'bloggeri kokkeli',
      author: 'postipate',
      url: 'http://kokkeli.com',
      likes: 77
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

    const titles = blogsAfterOperation.map(b => b.title)

    expect(titles).toContain('bloggeri kokkeli')
  })

  test('POST /api/blogs fails with proper status code if title or url is missing ', async () => {
    var newBlog = {
      author: 'minä',
      url: 'http://minunblogi.fi',
      likes: 1
    }

    const blogsAtStart = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'minunblogi',
      author: 'minä',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()


    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
  })

  test('POST /api/blogs when no value for likes is given sets blog\'s likes 0', async () => {
    var newBlog = {
      title: 'insert ironia',
      author: 'hipster-maukka',
      url: 'http://pyöräilyävaasankadulla.fi'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })
})

describe('deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'elämän poisto',
      author: 'emo',
      url: 'http://mustaakinmustempaa.fi',
      likes: 12
    })
    await addedBlog.save()
  })

  test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()
    const titles = blogsAfterOperation.map(b => b.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
})

describe('updating a blog', async () => {
  beforeAll(async () => {
    await Blog.remove({})
  })
  test('PUT /api/blogs/:id updates blog\'s likes', async () => {
    const blog = new Blog({
      title: 'elämän poisto',
      author: 'emo',
      url: 'http://mustaakinmustempaa.fi',
      likes: 12
    })

    const res = await api
      .post('/api/blogs')
      .send(blog)

    const savedBlog = res.body

    const updatedBlog = { ...savedBlog, likes: 20 }

    await api
      .put(`/api/blogs/${savedBlog._id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfterOperation = await blogsInDb()
    const blogsNamedElamanPoisto = blogsAfterOperation.filter(blog => blog.title === 'elämän poisto')

    expect(blogsNamedElamanPoisto.length).toBe(1)
    expect(blogsNamedElamanPoisto[0].likes).not.toBe(blog.likes)
    expect(blogsNamedElamanPoisto[0].likes).toBe(updatedBlog.likes)
  })
})

describe('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret', adult: true })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'teppotalervo',
      name: 'Teppo Talervo',
      password: 'salainen',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username is already taken or password is to short', async () => {
    const usersBeforeOperation = await usersInDb()

    let newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
      adult: true
    }

    let result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    newUser = {
      username: 'newuser',
      name: 'second user',
      password: 'sa',
      adult: true
    }

    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must be at least 3 characters long' })

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})

afterAll(() => {
  server.close()
})