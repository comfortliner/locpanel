'use strict';

const express = require('express');

const router = express.Router();

const db = require('../models');

// Middleware
const getRoom = async (req, res, next) => {
  let room;

  try {
    room = await db.Room.findByPk(req.params.id);
    if (room === null) {
      return res.status(404).json({ message: 'Cannot find room' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // eslint-disable-next-line no-param-reassign
  res.room = room;
  next();
};

// Helper functions
const getPagination = range => {
  if (range.length === 0) {
    return { limit: 0, offset: 0 };
  }
  const limit = range[1] - range[0] + 1;
  const offset = range[0] / limit * limit;

  return { limit, offset };
};

// room
// GETTING ALL
/**
 * @swagger
 * /reactAdmin/rooms:
 *  get:
 *    summary: Retrieve a list of all rooms.
 *    description: Retrieve a list of all rooms.
 *    parameters:
 *      - name: sort
 *        in: query
 *        description: sort query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *          example: name
 *      - name: order
 *        in: query
 *        description: order query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *          example: ASC
 *      - name: range
 *        in: query
 *        description: start query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *      - name: filter
 *        in: query
 *        description: filter query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *          example: foo=bar
 *    responses:
 *      '200':
 *        description: A response with the columns <code> id, name, columns, panelmode, boardwidth </code>. Empty array if no data is returned.
 *      '500':
 *        description: A response with an error message.
 */
router.get('/rooms', async (req, res) => {
  const { filter = '[]', range = '[]', sort = '["id", "ASC"]' } = req.query,
        { limit, offset } = getPagination(JSON.parse(range)),
        collection = req.path.replace('/', '');

  const params = {
    limit,
    offset,
    order: [ JSON.parse(sort) ],
    attributes: [ 'id', 'name', 'columns', 'panelmode', 'boardwidth' ],
    where: JSON.parse(filter)
  };

  try {
    const rangeArray = JSON.parse(range);
    const result = await db.Room.findAndCountAll(params);

    if (result === null) {
      res.set('Content-Range', `${collection} 0-0/0`);
      res.type('json').status(200).json([]);
    }

    if (JSON.parse(range).length > 0) {
      res.set('Content-Range', `${collection} ${rangeArray[0]}-${rangeArray[1]}/${result.count}`);
    } else {
      res.set('Content-Range', `${collection} 0-${result.count}/${result.count}`);
    }

    res.type('json').status(200).json(result.rows);
  } catch (error) {
    res.type('json').status(500).json({ message: error.message });
  }
});

// GETTING ONE
/**
 * @swagger
 * /reactAdmin/rooms/{id}:
 *  get:
 *    summary: Retrieve one single room.
 *    description: Retrieve one single room.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the room
 *        required: true
 *        schema:
 *          type: integer
 *          format: integer
 *    responses:
 *      '200':
 *        description: A response with the columns <code> id, name, columns, panelmode, boardwidth </code>. Empty array if no data is returned.
 *      '500':
 *        description: A response with an error message.
 */
router.get('/rooms/:id', getRoom, async (req, res) => {
  res.json(res.room);
});

// CREATING ONE
/**
 * @swagger
 * /reactAdmin/rooms:
 *  post:
 *    summary: Creates a new room.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: room
 *        description: The room to create.
 *        schema:
 *          type: object
 *          required:
 *          properties:
 *            name:
 *              type: string
 *            columns:
 *              type: string
 *    responses:
 *      '201':
 *        description: A response with the <code> id, name, columns, panelmode, boardwidth </code> of the new room.
 *      '400':
 *        description: A response with an error message.
 */
router.post('/rooms', async (req, res) => {
  const { name, columns } = req.body;

  try {
    const result = await db.Room.create({ name, columns });

    if (!result) {
      throw new Error('An unhandeled error occured!');
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATING ONE
/**
 * @swagger
 * /reactAdmin/rooms/{id}:
 *  patch:
 *    summary: Updates an existing room.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the room to update.
 *        required: true
 *        schema:
 *          type: integer
 *          format: integer
 *      - in: body
 *        name: room
 *        description: Update properties.
 *        schema:
 *          type: object
 *          required:
 *          properties:
 *            name:
 *              type: string
 *            columns:
 *              type: string
 *    responses:
 *      '200':
 *        description: A response with the <code> id, name, columns, panelmode, boardwidth </code> of the updated room.
 *      '400':
 *        description: A response with an error message.
 */
router.patch('/rooms/:id', getRoom, async (req, res) => {
  if (req.body.name !== null) {
    // eslint-disable-next-line no-param-reassign
    res.room.name = req.body.name;
  }

  if (req.body.columns !== null) {
    // eslint-disable-next-line no-param-reassign
    res.room.columns = req.body.columns;
  }

  try {
    const updatedRoom = await res.room.update({ name: res.room.name, columns: res.room.columns }, {
      where: {
        id: res.room.id
      }
    });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETING ONE
/**
 * @swagger
 * /reactAdmin/rooms/{id}:
 *  delete:
 *    summary: Delete one single room.
 *    description: Delete one single room.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the room
 *        required: true
 *        schema:
 *          type: integer
 *          format: integer
 *    responses:
 *      '200':
 *        description: <code> Deleted room </code>.
 *      '500':
 *        description: A response with an error message.
 */
router.delete('/rooms/:id', getRoom, async (req, res) => {
  try {
    await res.room.destroy();

    res.status(200).json({ message: 'Deleted room' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
