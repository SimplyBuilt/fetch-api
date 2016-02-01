import assert from 'assert';
import Mock from './fetch-mock';

global.fetch = Mock;

// Use require here since the global fetch
// mock function was unavailable with import
const Fetch = require('./fetch-api').Fetch;

suite('Fetch', () => {
    test('object is defined', () => {
        assert.notEqual(Fetch, undefined);
    });

    test('fetch()', () => {
        Fetch.fetch('/users.json', {
            credentials: 'include'
        });

        assert.equal(Mock.last.url, '/users.json');
        assert.equal(Mock.last.conf.credentials, 'include');
    });

    test('get() sets url', () => {
        Fetch.get('/users.json');

        assert.equal(Mock.last.url, '/users.json');
    });

    test('get() sets method property', () => {
        Fetch.get('/users.json');

        assert.equal(Mock.last.conf.method, 'GET');
    });

    test('get() with credentials set to true uses same-origin', () => {
        Fetch.get('/users.json', true);

        assert.equal(Mock.last.conf.credentials, 'same-origin');
    });

    test('get() with credentials', () => {
        Fetch.get('/users.json', 'omit');

        assert.equal(Mock.last.conf.credentials, 'omit');
    });

    test('get() with init configuration', () => {
        Fetch.get('/users.json', true, {
            mode: 'cors',
            redirect: 'follow',
            cache: 'reload',
            headers: {
                Accept: 'application/json'
            }
        });

        assert.equal(Mock.last.conf.mode, 'cors');
        assert.equal(Mock.last.conf.redirect, 'follow');
        assert.equal(Mock.last.conf.cache, 'reload');

        assert(Mock.last.conf.headers);
        assert.equal(Mock.last.conf.headers.Accept, 'application/json');
    });

    test('post() without body throws error', () => {
        assert.throws(() => {
            Fetch.post('/users.json');
        }, /body is required/);
    });

    test('patch() without body throws error', () => {
        assert.throws(() => {
            Fetch.patch('/users.json');
        }, /body is required/);
    });

    test('post() without type throws error', () => {
        assert.throws(() => {
            Fetch.post('/users.json', '{}');
        }, /type is required/);
    });

    test('patch() without type throws error', () => {
        assert.throws(() => {
            Fetch.patch('/users.json', '{}');
        }, /type is required/);
    });

    test('post() sets url', () => {
        Fetch.post('/users.json', '{}', 'json');

        assert.equal(Mock.last.url, '/users.json');
    });

    test('post() sets method property', () => {
        Fetch.post('/users.json', '{}', 'json');

        assert.equal(Mock.last.conf.method, 'POST');
    });

    test('patch() sets url', () => {
        Fetch.patch('/users.json', '{}', 'json');

        assert.equal(Mock.last.url, '/users.json');
    });

    test('patch() sets method property', () => {
        Fetch.patch('/users.json', '{}', 'json');

        assert.equal(Mock.last.conf.method, 'PATCH');
    });

    test('post() with credentials set to true uses same-origin', () => {
        Fetch.post('/users.json', '{}', 'json', true);

        assert.equal(Mock.last.conf.credentials, 'same-origin');
    });

    test('patch() with credentials set to true uses same-origin', () => {
        Fetch.patch('/users.json', '{}', 'json', true);

        assert.equal(Mock.last.conf.credentials, 'same-origin');
    });

    test('post() sets body', () => {
        Fetch.post('/users.json', '{"json":"body"}', 'json');

        assert.equal(Mock.last.conf.body, '{"json":"body"}');
    });

    test('patch() sets body', () => {
        Fetch.patch('/users.json', '{"json":"body"}', 'json');

        assert.equal(Mock.last.conf.body, '{"json":"body"}');
    });

    test('post() with json type sets Accept header', () => {
        Fetch.post('/users.json', '{}', 'json');

        assert.equal(Mock.last.conf.headers.Accept, 'application/json');
    });

    test('post() with json type sets Content-Type header', () => {
        Fetch.post('/users.json', '{}', 'json');

        assert.equal(Mock.last.conf.headers['Content-Type'], 'application/json');
    });

    test('patch() with json type sets Accept header', () => {
        Fetch.patch('/users.json', '{}', 'json');

        assert.equal(Mock.last.conf.headers.Accept, 'application/json');
    });

    test('patch() with json type sets Content-Type header', () => {
        Fetch.patch('/users.json', '{}', 'json');

        assert.equal(Mock.last.conf.headers['Content-Type'], 'application/json');
    });

    test('post() with form type does not set Accept header', () => {
        Fetch.post('/users.json', '', 'form');

        assert.equal(Mock.last.conf.headers.Accept, undefined);
    });

    test('post() with form type sets Content-Type header', () => {
        Fetch.post('/users.json', '{}', 'form');

        assert.equal(Mock.last.conf.headers['Content-Type'], 'application/x-www-form-urlencoded');
    });

    test('patch() with form does not set Accept header', () => {
        Fetch.patch('/users.json', '{}', 'form');

        assert.equal(Mock.last.conf.headers.Accept, undefined);
    });

    test('patch() with form type sets Content-Type header', () => {
        Fetch.patch('/users.json', '{}', 'form');

        assert.equal(Mock.last.conf.headers['Content-Type'], 'application/x-www-form-urlencoded');
    });
});
