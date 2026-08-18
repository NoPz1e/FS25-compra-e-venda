const select = document.getElementById('tipoSelect');
const blocos = document.querySelectorAll('.campos-condicionais');


select.addEventListener('change', function() {
  // Esconde todos os blocos primeiro
  blocos.forEach(bloco => bloco.hidden = true);

  // Mostra apenas o bloco correspondente à opção escolhida
  if (select.value === 'trator') {
    document.getElementById('trator').hidden = false;
  } else if (select.value === 'reboque') {
    document.getElementById('campoReboque').hidden = false;
  } else if (select.value === 'charrua') {
    document.getElementById('charrua').hidden = false;
  }

  console.log(select.value)
});




// charrua
const charruaWidth = document.getElementById('charrua_width');
const precocharrua = document.getElementById('preco_charrua');

const preco_m_charrua = 6400; // define aqui o valor pelo qual queres multiplicar

charruaWidth.addEventListener('input', function() {
  const largura = parseFloat(charruaWidth.value);

  if (!isNaN(largura)) {
    const preco = largura * preco_m_charrua;
    precocharrua.value = preco//.toFixed(2); // 2 casas decimais
  } else {
    precocharrua.value = '';
  }
});


// trator
const cavalagemtrator = document.getElementById('cavalagem_trator');
const selectCaixaTrator = document.getElementById('caixa_trator');
const selectVelocidadeTrator = document.getElementById('velocidade_trator');
const selectMarcaTrator = document.getElementById('marca_trator');
const selectTamanhoTrator = document.getElementById('tamanho_trator');
const bracos = document.getElementById('bracos_trator');
const carregador = document.getElementById('carregador_trator');

const precoTrator = document.getElementById('preco_trator');


cavalagemtrator.addEventListener('input', calcularPrecoTrator);
selectCaixaTrator.addEventListener('change', calcularPrecoTrator);
selectVelocidadeTrator.addEventListener('change', calcularPrecoTrator);
selectMarcaTrator.addEventListener('change', calcularPrecoTrator);
selectTamanhoTrator.addEventListener('change', calcularPrecoTrator);
bracos.addEventListener('change', calcularPrecoTrator);
carregador.addEventListener('change', calcularPrecoTrator);

function calcularPrecoTrator() {
  const cavalagem = parseFloat(cavalagemtrator.value);

  console.log('Cavalagem:', cavalagem);
  console.log('bracos.value', bracos.checked);
  console.log('carregador.value', carregador.checked);


  
};


















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