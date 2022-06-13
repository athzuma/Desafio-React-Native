import db from "./SQLiteDatabase";

db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY, userId INTEGER, title TEXT);"
  )
});

const create = (album) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO albums (id, userId, title) values (?, ?, ?);",
        [album.id, album.userId, album.title],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Erro ao inserir um Álbum!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const insertRows = (albums) => {
  let query = "INSERT INTO albums (id, userId, title) values ";
  albums.forEach(album => {
    query = query + `(${album.id}, ${album.userId}, '${album.title}')`;
    if (albums[albums.length -1] !== album) {
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
          else reject('Erro ao inserir álbuns!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, album) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE albums SET userId=?, title=? WHERE id=?;",
        [album.userId, album.title, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject(`Falha ao atualizar Álbum ${id}`);
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
        "SELECT * FROM albums WHERE id=?;",
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
        "SELECT * FROM albums;",
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
        "SELECT A.title, A.id, U.name, U.username FROM albums A INNER JOIN users U on A.userId = U.id;",
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
        "DELETE FROM albums WHERE id=?;",
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
        "DELETE FROM albums;",
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
