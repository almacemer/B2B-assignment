export const fetchColumns = async (): Promise<string[]> => {
    try {
        const response = await fetch('http://77.78.198.63:252/kolone') as Response;
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) { 
        console.log('Fetch columns error:', error);
        throw error;
    }
} 

export const fetchData = async (): Promise<any[]> => {
    try {
    const response = await fetch('http://77.78.198.63:252/sifre');
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    } catch (error: any) { 
        console.log('Fetch data error:', error);
        throw error;
    }
}
