import { callAPI, getEndpoint } from "./api";
import Posts from "./sqlite/Posts";
import Comments from "./sqlite/Comments";
import Albums from "./sqlite/Albums";
import Photos from "./sqlite/Photos";
import Todos from "./sqlite/Todos";
import Users from "./sqlite/Users";

export const updateLocalPosts = async (success, error) => {
  callAPI(getEndpoint('/posts'), 'GET', null, function(data) {
    Posts.reset()
    .then(() => {
      Posts.insertRows(data)
      .then(() => {
        success();
      })
      .catch(() => {
        error()
      })
    })
    .catch(() => {
      error();
    })
  }, function() {
    error();
  });
};

export const updateLocalComments = async (success, error) => {
  callAPI(getEndpoint('/comments'), 'GET', null, function(data) {
    Comments.reset()
    .then(() => {
      Comments.insertRows(data)
      .then(() => {
        success();
      })
      .catch(() => {
        error()
      })
    })
    .catch(() => {
      error();
    })
  }, function() {
    error();
  });
};

export const updateLocalAlbums = async (success, error) => {
  callAPI(getEndpoint('/albums'), 'GET', null, function(data) {
    Albums.reset()
    .then(() => {
      Albums.insertRows(data)
      .then(() => {
        success();
      })
      .catch(() => {
        error()
      })
    })
    .catch(() => {
      error();
    })
  }, function() {
    error();
  });
};

export const updateLocalPhotos = async (success, error) => {
  callAPI(getEndpoint('/photos'), 'GET', null, function(data) {
    Photos.reset()
    .then(() => {
      Photos.insertRows(data)
      .then(() => {
        success();
      })
      .catch(() => {
        error()
      })
    })
    .catch(() => {
      error();
    })
  }, function() {
    error();
  });
};

export const updateLocalTodos = async (success, error) => {
  callAPI(getEndpoint('/todos'), 'GET', null, function(data) {
    Todos.reset()
    .then(() => {
      Todos.insertRows(data)
      .then(() => {
        success();
      })
      .catch(() => {
        error()
      })
    })
    .catch(() => {
      error();
    })
  }, function() {
    error();
  });
};

export const updateLocalUsers = async (success, error) => {
  callAPI(getEndpoint('/users'), 'GET', null, function(data) {
    Users.reset()
    .then(() => {
      Users.insertRows(data)
      .then(() => {
        success();
      })
      .catch(() => {
        error()
      })
    })
    .catch(() => {
      error();
    })
  }, function() {
    error();
  });
};

export const updateLocalData = async (success, error) => {
  updateLocalPosts(function () {
    updateLocalComments(function () {
      updateLocalAlbums(function () {
        updateLocalPhotos(function () {
          updateLocalTodos(function () {
            updateLocalUsers(function () {
              success();
            }, function () {
              error();
            });
          }, function () {
            error();
          });
        }, function () {
          error();
        });
      }, function () {
        error();
      });
    }, function () {
      error();
    });
  }, function () {
    error();
  });
};