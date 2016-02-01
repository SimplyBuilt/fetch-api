const calls = [];
const mock = (url, conf) => {
    calls.push({
        get url()  { return url; },
        get conf() { return conf; }
    });
}

Object.defineProperty(mock, 'calls', {
    get() { return calls },
});

Object.defineProperty(mock, 'last', {
    get() { return calls[calls.length - 1]; }
});

export default mock;
