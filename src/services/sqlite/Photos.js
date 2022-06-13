import db from "./SQLiteDatabase";

db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY, albumId INTEGER, title TEXT, url TEXT, thumbnailUrl TEXT);"
  )
});

const create = (photo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO photos (id, albumId, title, url, thumbnailUrl) values (?, ?, ?, ?, ?);",
        [photo.id, photo.albumId, photo.title, photo.url, photo.thumbnailUrl],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Erro ao inserir uma foto!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const insertRows = (photos) => {
  let query = "INSERT INTO photos (id, albumId, title, url, thumbnailUrl) values ";
  photos.forEach(photo => {
    query = query + `(${photo.id}, ${photo.albumId}, '${photo.title}', '${photo.url}', '${photo.thumbnailUrl}')`;
    if (photos[photos.length -1] !== photo) {
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
          else reject('Erro ao inserir fotos!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, photo) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE photos SET albumId=?, title=?, url=? thumbnailUrl=? WHERE id=?;",
        [photo.postId, photo.name, photo.email, photo.body, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject(`Falha ao atualizar foto ${id}`);
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
        "SELECT * FROM photos WHERE id=?;",
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

const findByAlbum = (albumId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM photos WHERE albumId=?;",
        [albumId],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM photos;",
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
        "DELETE FROM photos WHERE id=?;",
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
        "DELETE FROM photos;",
        [],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default { create, insertRows, update, find, findByAlbum, all, remove, reset };
