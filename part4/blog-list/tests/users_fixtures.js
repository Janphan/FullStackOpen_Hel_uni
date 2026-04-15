const emptyUsers = []

const oneUser = [
    {
        id: '5a422aa71b54a676234d17f8',
        username: 'testuser',
        name: 'Test User',
        passwordHash: 'hashedpassword',
        blogs: []
    }
]

const listWithMultipleUsers = [
    {
        id: '5a422aa71b54a676234d17f8',
        username: 'root',
        name: 'Superuser',
        passwordHash: 'hashedpassword',
        blogs: []
    },
    {
        id: '6a422aa71b54a676234d17f8',
        username: 'johndoe',
        name: 'John Doe',
        passwordHash: 'hashedpassword',
        blogs: []
    },
    {
        id: '7a422aa71b54a676234d17f8',
        username: 'janedoe',
        name: 'Jane Doe',
        passwordHash: 'hashedpassword',
        blogs: []
    }
]

module.exports = {
    emptyUsers,
    oneUser,
    listWithMultipleUsers
}