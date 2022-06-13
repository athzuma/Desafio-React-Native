import db from "./SQLiteDatabase";

db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, userId INTEGER, title TEXT, body TEXT);"
  )
});

const create = (post) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO posts (id, userId, title, body) values (?, ?, ?, ?);",
        [post.id, post.userId, post.title, post.body],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Erro ao inserir um post!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const insertRows = (posts) => {
  let query = "INSERT INTO posts (id, userId, title, body) values ";
  posts.forEach(post => {
    query = query + `(${post.id}, ${post.userId}, '${post.title}', '${post.body}')`;
    if (posts[posts.length -1] !== post) {
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
          else reject('Erro ao inserir postagens!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, post) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE posts SET userId=?, title=?, body=? WHERE id=?;",
        [post.userId, post.title, post.body, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject(`Falha ao atualizar post ${id}`);
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
        "SELECT * FROM posts WHERE id=?;",
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
        "SELECT * FROM posts;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const allWithUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT P.id, P.userId, P.title, P.body, U.name, U.username FROM posts P INNER JOIN users U ON P.userId = U.id;",
        [],
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
        "DELETE FROM posts WHERE id=?;",
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
        "DELETE FROM posts;",
        [],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default { create, insertRows, update, find, all, allWithUsers, remove, reset };
