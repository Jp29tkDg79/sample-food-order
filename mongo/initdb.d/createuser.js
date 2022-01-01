const user = {
  user: "user",
  pwd: "user",
  roles: [
    {
      role: "readWrite",
      db: "store",
    },
  ],
};

db.createUser(user);