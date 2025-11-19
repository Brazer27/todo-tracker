import express from 'express';
import db from '../models/index.js';

const router = express.Router();
const { Todo } = db;

// GET /todos - List all todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    next(error);
  }
});

// POST /todos - Create a new todo
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description?.trim() || null,
      completed: false
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
});

// PUT /todos/:id - Update a todo
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (completed !== undefined) updateData.completed = completed;

    await todo.update(updateData);

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await todo.destroy();

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;