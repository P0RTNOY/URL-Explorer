const path = 'http://localhost:8080';

export const saveUrl = async(url) => {
        const response = await fetch(path + '/urls', {
          method: "POST", 
          mode: "cors", 
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify({url}),
        });
        return response.json(); 
}