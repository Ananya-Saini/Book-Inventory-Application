const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchBooks(queryParams = {}){
    const params = new URLSearchParams();
    if(queryParams.pageNumber) params.append('PageNumber', queryParams.pageNumber);
    if (queryParams.pageSize) params.append('pageSize', queryParams.pageSize);
    if (queryParams.searchTerm) params.append('searchTerm', queryParams.searchTerm);
    if (queryParams.genre) params.append('genre', queryParams.genre);
    if (queryParams.author) params.append('author', queryParams.author);
    if (queryParams.sortBy) params.append('sortBy', queryParams.sortBy);

    const url = `${API_BASE_URL}?${params.toString}`;
    const response = await fetch(url);

    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || errorData?.title || `Error fetching books (${response.status})`);
    }
    return await response.json();
}

export async function fetchBookByID(id){
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Book not found (${response.status})`);
    }
    return await response.json();
}

export async function createBook(bookData) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {'Context-Type': 'application/json'},
        body: JSON.stringify(bookData)
    })

    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        if (response.status === 409) {
            throw new Error(errorData?.detail || 'A book with this ISBN already exists.');
        }
        throw new Error(errorData?.detail || errorData?.title || 'Failed to create book.');
    }

    return await response.json();
}

