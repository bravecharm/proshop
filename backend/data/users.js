import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin Charm',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Rachel Green',
    email: 'rachel@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Ross Geller',
    email: 'ross@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
