import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjdiMjc4MGI5MGE1OGY1NjVmY2MxNzY1NDlmYmFmZSIsIm5iZiI6MTczOTU0NzUyOS45MjcsInN1YiI6IjY3YWY2Mzg5OTY2OWZmNDRjYzNiNmFjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3fXQ8YQLLXCkDKYJMRO6SKxlRg9DqLenexrfyjUG0vM'
      }
})

export default instance