# Fetch API

Terser fetch API for JavaScript.

## Examples

**GET** something:

```javascript
Fetch.get('/something.json').then(success).catch(failure);
```

**GET** something else with same-origin credentials:

```javascript
Fetch.get('/something-else.json').then(success).catch(failure);
```

**GET** something with headers

```javascript
Fetch.get('/something', {
  headers: {
    'Accept': 'application/json',
    'X-Request-With': 'fetch'
  }
});
```
**POST/PATCH** some JSON data:

```javascript
Fetch.post('/something.json', JSON.stringify({ user: {name: 'Simon' }), 'json');
```

Or **PATCH/POST** regular form data:

```javascript
Fetch.patch('/something.json', 'user[name]=Simon', 'form');
```

**POST/PATCH** some other body type with same origin credentials:

```javascript
Fetch.post('/something.json', btoa('hello'), 'application/base64', true);
```

**POST/PATCH** buffers:

```javascript
var buffer = new ArrayBuffer(128);
var view   = new Int32Array(buffer);

for (var i = 0; i < view.length; i++)
  view[i] = Math.pow(i, 2);

Fetch.patch('/something.json', buffer, 'application/octet-stream');
```
