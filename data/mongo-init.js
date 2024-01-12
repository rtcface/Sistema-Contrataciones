db.createUser({
  user: 'usrContrataciones',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'Contrataciones',
    },
  ],
});
