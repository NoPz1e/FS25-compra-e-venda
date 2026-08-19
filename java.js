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



// ler json de preços
let precos = {};

fetch('precos.json')
  .then(response => response.json())
  .then(data => {
    precos = data;
    console.log('Preços carregados:', precos);
  })
  .catch(err => console.error('Erro ao carregar preços:', err));



// charrua --------------------------------------------------------------------------
const charruaWidth = document.getElementById('charrua_width');
const precocharrua = document.getElementById('preco_charrua');

charruaWidth.addEventListener('input', function() {
  const largura = parseFloat(charruaWidth.value);

  if (!isNaN(largura)) {
    const preco = largura * precos.charrua.precoPorMetro; // multiplicar pelo preço por metro
    precocharrua.value = preco//.toFixed(2); // 2 casas decimais
  } else {
    precocharrua.value = '';
  }
});


// trator --------------------------------------------------------------------------
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


  if (!isNaN(cavalagem)) {
    let preco = cavalagem * precos.trator.cavalagem; // multiplicar pelo preço por cavalagem
    
    // Adiciona o preço da caixa
    preco += precos.trator.caixa[selectCaixaTrator.value] || 0;

    // Adiciona o preço da velocidade
    preco += precos.trator.velocidade[selectVelocidadeTrator.value] || 0;

    // Adiciona o preço da marca (combinado com o tamanho dentro da marca)
    preco += precos.trator[selectMarcaTrator.value]?.[selectTamanhoTrator.value] || 0;

    // Adiciona o preço do tamanho (tabela solta, independente da marca)
    preco += precos.trator.tamanho[selectTamanhoTrator.value] || 0;

    // Adiciona o preço dos braços
    preco += (bracos.checked ? precos.trator.bracos : 0);

    // Adiciona o preço do carregador
    preco += (carregador.checked ? precos.trator.carregador : 0);

    precoTrator.value = preco;
  } else {
    precoTrator.value = '';
  }
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