export const sendAuthData = async (data, setShow, setButtonDisabled) => {
  try {
    const response = await fetch("https://monitoring.qpart.com.ua:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.access_token) {
      localStorage.setItem("token", responseData.access_token);
      setShow(false);
      return responseData.access_token;
    }
  } catch (error) {
    console.error("Помилка авторизації:", error.message);
    throw error;
  } finally {
    setButtonDisabled(false);
  }
};
