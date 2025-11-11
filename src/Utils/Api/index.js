const DOMAIN_API = "http://localhost:3001/";

export const get = async (path) => {
    const response = await fetch(DOMAIN_API + path);
    const data = await response.json();
    return data;
}

export const post = async (path, data) => {
    const response = await fetch(DOMAIN_API + path, {
        method: "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
    })

    const newData = await response.json();
    return newData;
}

export const del = async (path) => {
    const response = await fetch(DOMAIN_API + path, {
        method: "DELETE"
    })

    const newData = await response.json();
    return newData;
}

export const patch = async (path, data) => {
    const response = fetch(DOMAIN_API + patch, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const newData = await response.json();
    return newData;
}
