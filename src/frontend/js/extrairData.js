export async function fetchData2() {
    try {
        const response = await fetch('https://dataviewinss.onrender.com/users');
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData3() {
    try {
        const response = await fetch('https://dataviewinss.onrender.com/sessao');
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

export async function fetchData4() {
    try {
        const response = await fetch('https://dataviewinss.onrender.com/tabela');
        const dados = await response.json();
        return dados;
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}


