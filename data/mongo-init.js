db.createUser({
  user: 'usrContratataciones',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'contrataciones',
    },
  ],
});
