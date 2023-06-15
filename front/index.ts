const url = 'http://localhost:4400';

function main() {
  console.log('Loaded');

  const login = async (event: Event) => {
    event.preventDefault();

    const { elements } = event.target! as HTMLFormElement;

    const data = {
      user: (elements.namedItem('user') as HTMLFormElement).value,
      passwd: (elements.namedItem('passwd') as HTMLFormElement).value,
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
  formElement!.addEventListener('submit', login);
}

document.addEventListener('DOMContentLoaded', main);
