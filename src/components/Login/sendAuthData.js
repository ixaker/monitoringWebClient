export const sendAuthData = async (data, setShow, setButtonDisabled) => {
  const dotenv_domain = process.env.NEXT_PUBLIC_DOTENV_DOMAIN;
  const dotenv_port = process.env.NEXT_PUBLIC_DOTENV_API_PORT;
  try {
    const response = await fetch(
      `https://${dotenv_domain}:${dotenv_port}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      } else {
        throw new Error('Network response was not ok');
      }
    }

    const responseData = await response.json();
    console.log('responseData', responseData);

    if (responseData.access_token) {
      localStorage.setItem('token', responseData.access_token);
      setShow(false);
      return responseData.access_token;
    }
  } catch (error) {
    console.error('Помилка авторизації:', error.message);
    throw error;
  } finally {
    setButtonDisabled(false);
  }
};
