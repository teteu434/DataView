import { reqLocal } from "./search.js";

export async function fetchData2() {
    try {
        const response = await fetch(`${reqLocal}/users`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData3() {
    try {
        const response = await fetch(`${reqLocal}/sessao`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData4() {
    try {
        const response = await fetch(`${reqLocal}/tabela`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}


