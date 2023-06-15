"use strict";
const url = 'http://localhost:4400';
function main() {
    console.log('Loaded');
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
        const result = await response.json();
        console.log(result);
    };
    const formElement = document.querySelector('.login-form');
    formElement.addEventListener('submit', login);
}
document.addEventListener('DOMContentLoaded', main);
