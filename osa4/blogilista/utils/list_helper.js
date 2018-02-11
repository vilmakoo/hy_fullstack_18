const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return 'no blogs were given'
  }

  let mostLikes = 0
  let favorite = {}

  blogs.forEach(blog => {
    if (blog.likes > mostLikes) {
      favorite = blog
      mostLikes = blog.likes
    }
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return 'no blogs were given'
  }

  let blogCounts = []

  blogs.forEach(blog => {
    if (blogCounts.find(bc => bc.author === blog.author) !== undefined) {
      blogCounts[blogCounts.indexOf(blogCounts.find(bc => bc.author === blog.author))].blogs += 1
    } else {
      blogCounts = blogCounts.concat({
        author: blog.author,
        blogs: 1
      })
    }
  })

  let authorWithMostBlogs = {}
  let mostBlogs = 0

  blogCounts.forEach(bc => {
    if (bc.blogs > mostBlogs) {
      authorWithMostBlogs = bc
      mostBlogs = bc.blogs
    }
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0) {
    return 'no blogs were given'
  }

  let blogVotes = []

  blogs.forEach(blog => {
    if (blogVotes.find(bc => bc.author === blog.author) !== undefined) {
      blogVotes[blogVotes.indexOf(blogVotes.find(bc => bc.author === blog.author))].votes += blog.likes
    } else {
      blogVotes = blogVotes.concat({
        author: blog.author,
        votes: blog.likes
      })
    }
  })

  let authorWithMostVotes = {}
  let mostVotes = 0

  blogVotes.forEach(bc => {
    if (bc.votes > mostVotes) {
      authorWithMostVotes = bc
      mostVotes = bc.votes
    }
  })

  return authorWithMostVotes
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}