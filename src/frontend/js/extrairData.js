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


export async function fetchData7() {
    try {
        const response = await fetch(`${reqLocal}/dadosAps`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData8() {
    try {
        const response = await fetch(`${reqLocal}/dadosCentrais`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData9() {
    try {
        const response = await fetch(`${reqLocal}/sr2`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData10() {
    try {
        const response = await fetch(`${reqLocal}/gexGeral`);
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}
