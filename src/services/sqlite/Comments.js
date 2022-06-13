import db from "./SQLiteDatabase";

db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, postId INTEGER, name TEXT, email TEXT, body TEXT);"
  )
});

const create = (comment) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO comments (id, postId, name, email, body) values (?, ?, ?, ?, ?);",
        [comment.id, comment.postId, comment.name, comment.email, comment.body],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Erro ao inserir um comentário!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const insertRows = (comments) => {
  let query = "INSERT INTO comments (id, postId, name, email, body) values ";
  comments.forEach(comment => {
    query = query + `(${comment.id}, ${comment.postId}, '${comment.name}', '${comment.email}', '${comment.body}')`;
    if (comments[comments.length -1] !== comment) {
      query = query + ",";
    }
  });
  query = query + ";";
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject('Erro ao inserir comentários!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, comment) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE comments SET postId=?, name=?, email=? body=? WHERE id=?;",
        [comment.postId, comment.name, comment.email, comment.body, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject(`Falha ao atualizar comentário ${id}`);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM comments WHERE id=?;",
        [id],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Nenhum registro encontrado!");
        },
        (_, error) => reject(error)
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM comments;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const findByPost = (postId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM comments WHERE postId=?;",
        [postId],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM comments WHERE id=?;",
        [id],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const reset = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM comments;",
        [],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default { create, insertRows, update, find, findByPost, all, remove, reset };
