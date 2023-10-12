function getLocalStorage(name){
    return window.localStorage.getItem(name);
}

function setLocalStorage(name,contents){
    window.localStorage.setItem(name,contents);
}

export { getLocalStorage, setLocalStorage };
