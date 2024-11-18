// Dados de usuários para login
function dados() {
    return [
        { id: 1, login: "matheus", password: "1234", email: "matheus@gmail.com" },
        { id: 2, login: "allan", password: "1234", email: "allan@gmail.com" },
        { id: 3, login: "larissa", password: "1234", email: "larissa@gmail.com" },
        { id: 4, login: "yasmin", password: "1234", email: "yasmin@gmail.com" },
        { id: 5, login: "zico", password: "1234", email: "zico@gmail.com" }
    ];
}

const usuarios = dados();

// Função de login
function Login() {
    const log = document.querySelector("#login").value.trim();
    const senha = document.querySelector("#password").value.trim();

    if (!log || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const loginSuccessful = usuarios.some(
        user => user.login === log && user.password === senha
    );

    if (loginSuccessful) {
        alert("Você logou!");
        window.location.href = "no_login_index.html";
    } else {
        alert("Login ou senha inválidos!");
    }
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === produto.nome);

    if (itemExistente) {
        // Se já existe, aumenta a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Se não existe, adiciona como novo item com quantidade inicial de 1
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Exibe mensagem de sucesso
    const mensagemExistente = document.querySelector(".mensagem-carrinho");
    if (mensagemExistente) mensagemExistente.remove();

    const mensagem = document.createElement("div");
    mensagem.className = "mensagem-carrinho";
    mensagem.textContent = `${produto.nome} foi adicionado ao carrinho!`;
    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.remove();
    }, 2000);

    atualizarContadorCarrinho(); // Atualiza o contador
}

// Função para exibir carrinho
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoLista = document.querySelector("#carrinho-lista ul");
    if (!carrinhoLista) return;

    carrinhoLista.innerHTML = ""; // Limpa a lista

    if (carrinho.length === 0) {
        carrinhoLista.innerHTML = '<li class="carrinho-vazio">Carrinho vazio</li>';
    } else {
        let total = 0;
        carrinho.forEach((item, index) => {
            total += item.preco * item.quantidade; // Calcula o total
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.quantidade}x ${item.nome} - R$${(item.preco * item.quantidade).toFixed(2)}</span>
                <button class="remover-btn" data-index="${index}">Remover</button>
            `;
            carrinhoLista.appendChild(li);
        });

        const liTotal = document.createElement("li");
        liTotal.innerHTML = `<strong>Total: R$${total.toFixed(2)}</strong>`;
        carrinhoLista.appendChild(liTotal);
    }

    document.querySelector("#carrinho-lista").style.display = "block";

    // Adiciona evento para botões de remover
    document.querySelectorAll(".remover-btn").forEach((button) => {
        button.addEventListener("click", function () {
            removerDoCarrinho(this.dataset.index);
        });
    });
}

// Função para remover item do carrinho
function removerDoCarrinho(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho[index].quantidade > 1) {
        // Se a quantidade for maior que 1, reduz a quantidade
        carrinho[index].quantidade -= 1;
    } else {
        // Se a quantidade for 1, remove o item completamente
        carrinho.splice(index, 1);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    exibirCarrinho();
}

// Função para esconder o carrinho
function esconderCarrinho() {
    const carrinho = document.querySelector("#carrinho-lista");
    if (carrinho) {
        carrinho.style.display = "none";
    }
}

// Função para atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const contador = document.querySelector("#contador-carrinho");

    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    if (contador) {
        contador.textContent = totalItens;
    }
}

// Eventos ao carregar o DOM
document.addEventListener("DOMContentLoaded", function () {
    // Botão de login
    const loginBtn = document.querySelector("#loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", Login);
    }

    // Botão do carrinho
    const carrinhoBtn = document.querySelector("#carrinhoBtn");
    if (carrinhoBtn) {
        carrinhoBtn.addEventListener("click", exibirCarrinho);
    }

    // Fecha o carrinho ao clicar fora dele
    window.addEventListener("click", function (event) {
        const carrinho = document.querySelector("#carrinho-lista");
        const carrinhoBtn = document.querySelector("#carrinhoBtn");

        if (
            carrinho &&
            !carrinho.contains(event.target) &&
            event.target !== carrinhoBtn &&
            !carrinhoBtn.contains(event.target)
        ) {
            esconderCarrinho();
        }
    });

    atualizarContadorCarrinho(); // Atualiza contador ao carregar a página
});
