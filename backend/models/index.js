import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const configPath = join(__dirname, '..', 'config', 'config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'))[env];

const sequelize = new Sequelize(config);

const db = {};

// Import models
import todoModel from './todo.js';

db.Todo = todoModel(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
