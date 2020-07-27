export let SaveItem = function (key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (e) {
        // ignore
    }
};

export let SaveItemWithExpiration = function (key, value, expiration) {
    try {
        let data = {"_val_": value, "_exp_": expiration};
        let val = JSON.stringify(data);
        window.localStorage.setItem(key, val);
        return val
    } catch (e) {
        // ignore
        return null;
    }
};

export let AppendItem = function (key, value) {
    console.log('storage.js', 'AppendItem', key, value);
    try {
        let saved = QueryItem(key);
        let items = [];
        if (saved) {
            items = JSON.parse(saved);
        }
        let found = false;
        for (let i = 0, len = items.length; i < len; i++) {
            let one = items[i];
            if (Object.prototype.hasOwnProperty.call(one, 'id') && one['id'] === value.id) {
                items[i] = value;
                found = true;
            }
        }
        if (!found) {
            items.push(value);
        }
        window.localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
        // ignore
    }
};

export let QueryItem = function (key) {
    try {
        return window.localStorage.getItem(key)
    } catch (e) {
        return null;
    }
};

export let QueryItemCheckExpiration = function (key) {
    try {
        let ret = window.localStorage.getItem(key);
        if (ret) {
            ret = JSON.parse(ret)
            if (Object.prototype.hasOwnProperty.call(ret, "_exp_")) {
                let expiration = ret['_exp_'];
                let now = new Date().getTime() / 1000;
                if (now > expiration) {
                    return null;
                }
            }
            if (Object.prototype.hasOwnProperty.call(ret, "_val_")) {
                return ret['_val_'];
            }
            return ret;
        }
        return null;
    } catch (e) {
        return null;
    }
};

export let DeleteItem = function (key) {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        // ignore
    }
};

export let KeysLength = function (prefix) {
    let count = 0;
    let keys = Keys();
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(prefix) === 0) {
            count++;
        }
    }
    return count;
}

export let Keys = function () {
    try {
        let keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }
        return keys
    } catch (e) {
        return [];
    }
}