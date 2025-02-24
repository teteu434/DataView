import { reqLocal } from "./search.js";

export async function fetchData(rota) {
    try {
        const response = await fetch(`${reqLocal}/${rota}`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

