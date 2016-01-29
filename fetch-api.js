!function(win){
    var types = {
        json: 'application/json', form: 'application/x-www-form-urlencoded',
    };

    function fetchWithBody(method, input, body, type, creds, init){
        if (body == undefined) throw 'body is required';
        if (type == undefined) throw 'type is required';

        init = init || {};

        if (creds === true)
            init.credentials = 'same-origin';
        else if (creds != undefined)
            init.credentials = creds;

        init.method = method;
        init.body = body

        init.headers = init.headers || {};
        init.headers['Accept'] = init.headers['Accept'] || types[type];
        init.headers['Content-Type'] = types[type] || type;

        return fetch(input, init);
    }

    win.Fetch = {
        fetch:function(input, init){
            return fetch(input, init);
        },

        get:function(input, creds, init){
            init = init || {};
            init.method = 'GET';

            if (creds === true)
                init.credentials = 'same-origin';
            else if (creds != undefined)
                init.credentials = creds;

            return fetch(input, init);
        },

        post:function(input, body, type, creds, init){
            return fetchWithBody('POST', input, body, type, creds, init);
        },

        patch:function(input, body, type, creds, init){
            return fetchWithBody('PATCH', input, body, type, creds, init);
        },
    };
}(window);
