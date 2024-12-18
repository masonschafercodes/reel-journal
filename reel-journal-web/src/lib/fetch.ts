// custom fetch impl to support generic types

async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export default fetcher;
