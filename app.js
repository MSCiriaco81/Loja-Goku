// Dados de usuários para login (exemplo hardcoded)
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

function Login() {
    const log = document.querySelector("#loginEmail").value.trim(); // ID corrigido
    const senha = document.querySelector("#loginPassword").value.trim(); // ID corrigido

    if (!log || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Busca usuários registrados no localStorage e adiciona aos usuários estáticos
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const todosUsuarios = [...usuarios, ...usuariosRegistrados];

    // Verifica o login
    const usuario = todosUsuarios.find(user => user.email === log && user.password === senha);

    if (usuario) {
        alert(`Bem-vindo, ${usuario.login || usuario.email}!`); // Exibe o login ou email
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.top.location.href = "no_login_index.html"; // Redireciona para a página principal
    } else {
        alert("Login ou senha inválidos!");
    }
}

// cadastro
function cadastrar() {
    const email = document.querySelector("#registerEmail").value.trim();
    const senha = document.querySelector("#registerPassword").value.trim();

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Obtém os usuários existentes do localStorage ou inicia um array vazio
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o email já está cadastrado
    if (usuarios.some(user => user.email === email)) {
        alert("Esse email já está registrado!");
        return;
    }

    // Cria um novo usuário
    const novoUsuario = {
        id: Date.now(), // Gera um ID único baseado no timestamp atual
        email: email,
        password: senha
    };

    usuarios.push(novoUsuario); // Adiciona o novo usuário ao array
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Salva no localStorage

    alert("Usuário registrado com sucesso!");
    toggleLogin(); // Alterna para o formulário de login
}



// Função para verificar login ao carregar outra página
function verificarUsuarioLogado() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
        const bemVindo = document.querySelector("#bemVindo");
        if (bemVindo) {
            bemVindo.textContent = `Bem-vindo, ${usuarioLogado.login}!`;
        }
    } else {
        window.location.href = "login.html"; // Redireciona para login se não estiver logado
    }
}

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(produto) {
    if (!produto.nome || !produto.preco) {
        alert("Produto inválido!");
        return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemExistente = carrinho.find(item => item.nome === produto.nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarMensagem(`${produto.nome} foi adicionado ao carrinho!`);
    atualizarContadorCarrinho();
}

// Função para exibir mensagens temporárias
function mostrarMensagem(texto) {
    const mensagem = document.createElement("div");
    mensagem.className = "mensagem-carrinho";
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);

    setTimeout(() => mensagem.remove(), 2000);
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
function finalizarCompra() {
    window.location.href = "carrinho.html"; // Redireciona para a página carrinho.html
}
// Função para abrir o modal
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex'; // Abre o modal
    }
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none'; // Fecha o modal
    }
}

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
};

// Adiciona evento ao botão de fechar no modal (se existir)
document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector('.modal .close');
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
});
function resetPassword() {
    const email = document.getElementById("forgotEmail").value.trim();

    // Busca os usuários do localStorage
    let users = JSON.parse(localStorage.getItem("usuarios")) || []; // Use "usuarios" como chave consistente

    // Encontra o índice do usuário pelo email
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
        // Solicita que o usuário digite uma nova senha
        const newPassword = prompt("Digite a nova senha:");

        // Valida se o usuário digitou uma nova senha válida
        if (newPassword && newPassword.trim() !== "") {
            users[userIndex].password = newPassword.trim(); // Atualiza a senha no array de usuários
            localStorage.setItem("usuarios", JSON.stringify(users)); // Salva no localStorage
            alert("Senha alterada com sucesso!");

            // Volta para o formulário de login
            document.getElementById("forgotPasswordForm").classList.add("hidden");
            document.getElementById("registerForm").classList.add("hidden");
            document.getElementById("loginForm").classList.remove("hidden");
        } else {
            alert("Por favor, digite uma senha válida.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
}
function revealPassword() {
    const email = document.getElementById("forgotEmail").value.trim();

    if (!email) {
        alert("Por favor, insira o email.");
        return;
    }

    // Busca os usuários registrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura o usuário com o email fornecido
    const usuario = usuarios.find(user => user.email === email);

    if (usuario) {
        alert(`Sua senha é: ${usuario.password}`);
    } else {
        alert("Usuário não encontrado. Verifique o email informado.");
    }
}
