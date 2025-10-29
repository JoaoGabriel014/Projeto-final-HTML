/* Código JS extraído de clientes.html */
const form = document.getElementById("clienteForm");
const clientesList = document.getElementById("clientesList");
const buscaInput = document.getElementById("buscaCliente");
const MAX_CLIENTES = 10;
let clientId = clientesList ? clientesList.rows.length + 1 : 1;
let editMode = false;
let editRow = null;

if (buscaInput) {
  buscaInput.addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const linhas = clientesList.getElementsByTagName("tr");
    for (let linha of linhas) {
      linha.style.display = linha.textContent.toLowerCase().includes(termo) ? "" : "none";
    }
  });
}

const nomeInput = document.getElementById("nome");
if (nomeInput) {
  nomeInput.addEventListener("input", function (e) {
    const value = e.target.value;
    if (/\d/.test(value)) {
      e.target.value = value.replace(/\d/g, "");
      if (e.inputType !== "deleteContentBackward") alert("⚠️ O campo 'Nome' não pode conter números!");
    }
  });
}

const cpfInput = document.getElementById("cpf");
if (cpfInput) {
  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (e.data && /[A-Za-z]/.test(e.data)) alert("⚠️ O campo 'CPF' deve conter apenas números!");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 9) value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    else if (value.length > 3) value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    e.target.value = value;
  });
}

const telInput = document.getElementById("telefone");
if (telInput) {
  telInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (e.data && /[A-Za-z]/.test(e.data)) alert("⚠️ O campo 'Telefone' deve conter apenas números!");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    else if (value.length > 2) value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    else value = value.replace(/(\d{0,2})/, "($1");
    e.target.value = value;
  });
}

if (document.getElementById("novoClienteBtn")) {
  document.getElementById("novoClienteBtn").addEventListener("click", () => {
    if (form) form.reset();
    editMode = false;
    editRow = null;
    const titulo = document.getElementById("tituloForm");
    if (titulo) titulo.textContent = "Novo Cliente";
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const fotoInput = document.getElementById("foto");
    const foto = fotoInput && fotoInput.files[0] ? URL.createObjectURL(fotoInput.files[0]) : "https://via.placeholder.com/50";

    if (nome === "" || /\d/.test(nome)) {
      alert("⚠️ O nome não pode conter números nem estar vazio!");
      return;
    }

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
      alert("⚠️ Telefone inválido! Use o formato (00) 00000-0000.");
      return;
    }

    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      alert("⚠️ CPF inválido! Use o formato 000.000.000-00.");
      return;
    }

    if (!editMode) {
      if (clientesList && clientesList.rows.length >= MAX_CLIENTES) {
        alert("⚠️ Limite máximo de " + MAX_CLIENTES + " clientes atingido!");
        return;
      }

      if (clientesList) {
        for (let row of clientesList.rows) {
          const cpfExistente = row.cells[1].textContent;
          const telExistente = row.cells[4].textContent;
          if (cpfExistente === cpf) { alert("❌ Este CPF já está cadastrado!"); return; }
          if (telExistente === telefone) { alert("❌ Este telefone já está cadastrado!"); return; }
        }

        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
          <td>${clientId++}</td>
          <td>${cpf}</td>
          <td><img class="rounded-circle" src="${foto}" width="50"></td>
          <td>${nome}</td>
          <td>${telefone}</td>
          <td>${endereco}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="editarCliente(this)">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="excluirCliente(this)">Excluir</button>
          </td>`;
        clientesList.appendChild(novaLinha);
      }
    } else if (editRow) {
      editRow.cells[1].textContent = cpf;
      if (fotoInput && fotoInput.files[0]) editRow.cells[2].innerHTML = `<img class="rounded-circle" src="${foto}" width="50">`;
      editRow.cells[3].textContent = nome;
      editRow.cells[4].textContent = telefone;
      editRow.cells[5].textContent = endereco;
      alert("✅ Cliente atualizado com sucesso!");
    }

    form.reset();
    const offcanvas = bootstrap && bootstrap.Offcanvas ? bootstrap.Offcanvas.getInstance(document.getElementById("add-cliente")) : null;
    if (offcanvas) offcanvas.hide();
    editMode = false; editRow = null;
  });
}

function excluirCliente(botao) { if (confirm("Tem certeza que deseja excluir este cliente?")) botao.closest("tr").remove(); }

function editarCliente(botao) {
  const row = botao.closest("tr");
  editMode = true; editRow = row;
  const cpfEl = document.getElementById("cpf");
  if (cpfEl) cpfEl.value = row.cells[1].textContent;
  const nomeEl = document.getElementById("nome"); if (nomeEl) nomeEl.value = row.cells[3].textContent;
  const telEl = document.getElementById("telefone"); if (telEl) telEl.value = row.cells[4].textContent;
  const endEl = document.getElementById("endereco"); if (endEl) endEl.value = row.cells[5].textContent;
  const titulo = document.getElementById("tituloForm"); if (titulo) titulo.textContent = "Editar Cliente";
  const off = bootstrap && bootstrap.Offcanvas ? new bootstrap.Offcanvas(document.getElementById("add-cliente")) : null;
  if (off) off.show();
}

/* Segundo bloco extraído: substitui ícones e toggle */
document.addEventListener("DOMContentLoaded", () => {
  if (window.feather) try { feather.replace(); } catch (e) { /* ignore */ }

  const toggleBtn = document.getElementById("toggleTabelaBtn");
  const tabela = document.getElementById("tabelaClientes");
  if (toggleBtn && tabela) {
    toggleBtn.addEventListener("click", () => {
      const ocultando = tabela.style.display !== "none";
      tabela.style.display = ocultando ? "none" : "";
      toggleBtn.innerHTML = ocultando
        ? `${feather.icons["eye-off"].toSvg()} <span>Mostrar tabela</span>`
        : `${feather.icons["eye"].toSvg()} <span>Ocultar tabela</span>`;
    });
  }
});
