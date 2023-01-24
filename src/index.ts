import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 4200
app.post('/', async (req, res, next) => {
    const { title, content, authorEmail } = req.body
    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            author: { connect: { email: authorEmail } },
        },
    })
    res.json(post)
})

app.get('/', async (req, res, next) => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: { author: true },
    })
    res.json(posts)
})

app.listen(port, () => {
    console.log("Listening on " + port);

})