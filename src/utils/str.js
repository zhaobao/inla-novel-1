export let CapitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export let ObjectAryContain = function (items, key, value) {
    return items.filter((item) => {
        return item[key] === value;
    }).length > 0;
}

/**
 * Object Array 中查找指定键的值是存在
 * @param items
 * @param key
 * @param value
 * @returns {number}
 * @constructor
 */
export let ObjectAryIndexOf = function (items, key, value) {
    for (let i = 0, len = items.length; i < len; i++) {
        if (items[i][key] === value) {
            return i
        }
    }
    return -1;
}