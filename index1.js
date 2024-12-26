require('dotenv').config();

const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.json());


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blogs'
})

Blog.sync({ force: true, alter: false })

app.get('/api/blogs', async (req, res) => {
    // List all blogs
    const blogs = await Blog.findAll();
    return res.status(200).json(blogs);
})

app.post('/api/blogs', async (req, res) => {
    // Add a new blog
    console.log(req.body)
    try {
        const blog = await Blog.create(req.body);
        return res.status(201).json(blog);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    // Delete a blog
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    await blog.destroy();
    return res.status(204).end();
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})