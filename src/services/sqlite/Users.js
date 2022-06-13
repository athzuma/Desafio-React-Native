import db from "./SQLiteDatabase";

db.transaction(tx => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, username TEXT, email TEXT, address_street TEXT, address_suite TEXT, address_city TEXT, address_zipcode TEXT, address_geo_lat TEXT, address_geo_lng TEXT, phone TEXT, website TEXT, company_name TEXT, company_catchPhrase TEXT, company_bs TEXT);"
  )
});

const create = (user) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (id, name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchPhrase, company_bs) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [user.id, user.name, user.username, user.email, user.address.street, user.address.suite, user.address.city, user.address.zipcode, user.address.geo.lat, user.address.geo.lng, user.phone, user.website, user.company.name, user.company.catchPhrase, user.company.bs],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject('Erro ao inserir um usuário!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const insertRows = (users) => {
  let query = "INSERT INTO users (id, name, username, email, address_street, address_suite, address_city, address_zipcode, address_geo_lat, address_geo_lng, phone, website, company_name, company_catchPhrase, company_bs) values ";
  users.forEach(user => {
    query = query + `(${
      user.id
    }, '${
      user.name
    }', '${
      user.username
    }', '${
      user.email
    }', '${
      user.address.street
    }', '${
      user.address.suite
    }', '${
      user.address.city
    }', '${
      user.address.zipcode
    }', '${
      user.address.geo.lat
    }', '${
      user.address.geo.lng
    }', '${
      user.phone
    }', '${
      user.website
    }', '${
      user.company.name
    }', '${
      user.company.catchPhrase
    }', '${
      user.company.bs
    }')`;
    if (users[users.length -1] !== user) {
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
          else reject('Erro ao inserir usuários!');
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, user) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET name=?, username=?, email=?, address_street=?, address_suite=?, address_city=?, address_zipcode=?, address_geo_lat=?, address_geo_lng=?, phone=?, website=?, company_name=?, company_catchPhrase=?, company_bs=? WHERE id=?;",
        [user.name, user.username, user.email, user.address.street, user.address.suite, user.address.city, user.address.zipcode, user.address.geo.lat, user.address.geo.lng, user.phone, user.website, user.company.name, user.company.catchPhrase, user.company.bs, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject(`Falha ao atualizar usuário ${id}`);
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
        "SELECT * FROM users WHERE id=?;",
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
        "SELECT * FROM users;",
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
        "DELETE FROM users WHERE id=?;",
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
        "DELETE FROM users;",
        [],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error)
      );
    });
  });
};

export default { create, insertRows, update, find, all, remove, reset };
