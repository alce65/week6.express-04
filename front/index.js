"use strict";
const url = 'http://localhost:4400';
const storeName = 'Sample';
function main() {
    console.log('Loaded');
    let state = {};
    const formElement = document.querySelector('.login-form');
    const logoutElement = document.querySelector('.logout');
    const buttonElement = document.querySelector('.show-button');
    const store = localStorage.getItem(storeName);
    if (store) {
        state.token = JSON.parse(store).token;
        formElement?.setAttribute('hidden', 'true');
        logoutElement?.removeAttribute('hidden');
    }
    else {
        formElement?.removeAttribute('hidden');
        logoutElement?.setAttribute('hidden', 'true');
    }
    const login = async (event) => {
        event.preventDefault();
        const { elements } = event.target;
        const data = {
            user: elements.namedItem('user').value,
            passwd: elements.namedItem('passwd').value,
        };
        const urlLogin = url + '/user/login';
        const response = await fetch(urlLogin, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        state = await response.json();
        localStorage.setItem(storeName, JSON.stringify({ token: state.token }));
        formElement?.setAttribute('hidden', 'true');
        logoutElement?.removeAttribute('hidden');
        console.log(state);
    };
    const logout = () => {
        localStorage.removeItem(storeName);
        state = {};
        formElement?.removeAttribute('hidden');
        logoutElement?.setAttribute('hidden', 'true');
    };
    const handleClick = async () => {
        if (!state.token)
            return;
        const urlBooks = url + '/book';
        const response = await fetch(urlBooks, {
            headers: {
                Authorization: 'Bearer ' + state.token,
            },
        });
        const result = await response.json();
        console.log(result);
    };
    formElement.addEventListener('submit', login);
    buttonElement?.addEventListener('click', handleClick);
    logoutElement?.addEventListener('click', logout);
}
document.addEventListener('DOMContentLoaded', main);
