// Alternar entre os formulários de Login e Registro
function toggleRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("registerTitle").innerText = "Registro";
    document.getElementById("registerSwitchRole").checked = false;
}

function toggleLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("loginTitle").innerText = "Login";
    document.getElementById("switchRole").checked = false;
                // Esconder todos os formulários e mostrar apenas o de login
                document.getElementById("forgotPasswordForm").classList.add("hidden");
                document.getElementById("registerForm").classList.add("hidden");
                document.getElementById("loginForm").classList.remove("hidden");
}

// Alternar entre Esqueceu a Senha e Login
function toggleForgotPassword() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("forgotPasswordForm").classList.remove("hidden");
}

function cadastrar() {
    let dados = JSON.parse(localStorage.getItem("usuario"));
    let login = document.querySelector("#cadastroId").value;
    let senha = document.querySelector("#senha1").value;
    let user = { id: Date.now(), login: login, password: senha };
    dados.push(user);
    sessionStorage.setItem("usuario", JSON.stringify(dados));
    alert("Registro adicionado.");
 
}

function login() {
 
    let usuarios = JSON.parse(sessionStorage.getItem("usuario"))
 
    let log = document.querySelector('#login').value
    let senha = document.querySelector('#password').value
 
 
    let eCorreto = false;
 
    for (let i = 0; i < usuarios.length; i++) {
        if (log == usuarios[i].login && senha == usuarios[i].password) {
            window.location.href = "index.html";
            eCorreto = true;
            alert('Seja bem-vindo ' + usuarios[i].login)
            break;
        }
    }
 
    if (!eCorreto) {
        alert('Login incorreto!')
    }
 
}

// Função para abrir o modal
function openModal() {
    document.getElementById('modal').style.display = 'flex'; // Abre o modal
    
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none'; // Fecha o modal
    
}

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

