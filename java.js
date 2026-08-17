const select = document.getElementById('tipoSelect');
const blocos = document.querySelectorAll('.campos-condicionais');

// charrua
const charruaWidth = document.getElementById('charrua_width');
const precocharrua = document.getElementById('preco_charrua');

const preco_m_charrua = 6400; // define aqui o valor pelo qual queres multiplicar





select.addEventListener('change', function() {
  // Esconde todos os blocos primeiro
  blocos.forEach(bloco => bloco.hidden = true);

  // Mostra apenas o bloco correspondente à opção escolhida
  if (select.value === 'charrua') {
    document.getElementById('charrua').hidden = false;
  } else if (select.value === 'reboque') {
    document.getElementById('campoReboque').hidden = false;
  } else if (select.value === 'trator') {
    document.getElementById('campoTrator').hidden = false;
  }

  console.log(select.value)
});


charruaWidth.addEventListener('input', function() {
  const largura = parseFloat(charruaWidth.value);

  if (!isNaN(largura)) {
    const preco = largura * preco_m_charrua;
    precocharrua.value = preco//.toFixed(2); // 2 casas decimais
  } else {
    precocharrua.value = '';
  }
});



// copiar valores
const botoesCopiar = document.querySelectorAll('.btn-copiar');

botoesCopiar.forEach(botao => {
  botao.addEventListener('click', function() {
    const targetId = botao.dataset.target;
    const campo = document.getElementById(targetId);

    navigator.clipboard.writeText(campo.value)
      .then(() => {
        const img = botao.querySelector('img');
        const srcOriginal = img.src;

        img.src = '/assets/check_icon.png'; // um ícone de "certo" para feedback visual
        setTimeout(() => {
          img.src = srcOriginal;
        }, 1500);
      })
      .catch(err => {
        console.error('Erro ao copiar:', err);
      });
  });
});

// enviar para calculo de usados/venda
const botoesEnviar = document.querySelectorAll('.btn-enviar');

botoesEnviar.forEach(botao => {
  botao.addEventListener('click', function() {
    const origemId = botao.dataset.origem;
    const targetId = botao.dataset.target;

    const origem = document.getElementById(origemId);
    const destino = document.getElementById(targetId);

    destino.value = origem.value;
  });
});