const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyBlogs } = require('./blogs_fixtures')
test('dummy returns one', () => {
    const result = listHelper.dummy(emptyBlogs)
    assert.strictEqual(result, 1)
})