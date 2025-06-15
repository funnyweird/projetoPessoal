const db = require('../config/db');

class Task {
  static async getAll() {
    const result = await db.query('SELECT * FROM tasks');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO tasks (titulo, descricao, status, tempo, tag, categoria, prazo, user_id, criado_em)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_DATE)
       RETURNING *`,
      [data.titulo, data.descricao, data.status, data.tempo, data.tag, data.categoria, data.prazo, data.user_id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      `UPDATE tasks
       SET titulo = $1, descricao = $2, status = $3, tempo = $4, tag = $5, categoria = $6, prazo = $7
       WHERE id = $8
       RETURNING *`,
      [data.titulo, data.descricao, data.status, data.tempo, data.tag, data.categoria, data.prazo, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Task;
