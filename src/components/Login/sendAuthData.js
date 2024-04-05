export const sendAuthData = async (data) => {
    try {
        const response = await fetch('http://monitoring.qpart.com.ua/logn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            
            if (responseData.token) {
                localStorage.setItem('token', responseData.token);
            }
    
        } else {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        throw error;
    }
};