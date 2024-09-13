// Script para navegação do menu
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}


if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
};




//Script manipulação do carrinho 
$(document).ready(function () {
    vitrine.eventos.init();
})

var vitrine = {};

var item = {};

var ITEM_ID = 0;
var PRODUTO = {};

var CATEGORIA_PRODUTO = {};

var MEU_CARRINHO = [];
var MEU_ENDERECO = null;

var VALOR_CARRINHO = 0;
var VALOR_ENTREGA = 5;

var CELULAR_EMPRESA = '5565992741259';

vitrine.eventos = {

    init: () => {
        vitrine.metodos.obteritensVitrine();
        vitrine.metodos.carregarCarrinhoDoLocalStorage();

        let url = new URL(window.location.href);
        var p = url.searchParams.get('p');

        ITEM_ID = p;

        if(ITEM_ID != null) {
            vitrine.metodos.carregarDetalhesProduto();
        }
    }
}

vitrine.metodos = {

    
    //obtem a lista de itens da vitrine
    obteritensVitrine: (categoria = 'conjunto', vermais = false) =>  {

        //obtem a lista de itens em destaque
        var filtro = MENU['destaque'];
        console.log(filtro);

        $.each(filtro, (i, e) => {

            let temp = vitrine.templates.itemIndex.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))
            .replace(/\${id}/g, e.id)
            .replace(/\${corum}/g, e.corum)
            .replace(/\${cordois}/g, e.cordois)
            .replace(/\${cortres}/g, e.cortres)
            .replace(/\${dsc}/g, e.dsc)
            .replace(/\${imgdetalheum}/g, e.imgdetalheum)
            .replace(/\${imgdetalhedois}/g, e.imgdetalhedois)
            .replace(/\${imgdetalhetres}/g, e.imgdetalhetres)

            $("#itensVitrineDestaque").append(temp)

        });

        //obtem a lista de itens recém-chegados
        var filtro = MENU['recemchegadas'];
        console.log(filtro);

        $.each(filtro, (i, e) => {

            let temp = vitrine.templates.itemIndexRecem.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))
            .replace(/\${id}/g, e.id)
            .replace(/\${corum}/g, e.corum)
            .replace(/\${cordois}/g, e.cordois)
            .replace(/\${cortres}/g, e.cortres)
            .replace(/\${dsc}/g, e.dsc)
            .replace(/\${imgdetalheum}/g, e.imgdetalheum)
            .replace(/\${imgdetalhedois}/g, e.imgdetalhedois)
            .replace(/\${imgdetalhetres}/g, e.imgdetalhetres)

            $("#itensVitrineRecemchegados").append(temp)

        });
    
    
         //obtem a lista de itens da vitrine
         var filtro = MENU[categoria];
         console.log(filtro);

         if (!vermais) {
            $("#itensVitrine").html('');
            $("#btnVermais").removeClass('hidden');
         }
 
         $.each(filtro, (i, e) => {
 
             let temp = vitrine.templates.item.replace(/\${img}/g, e.img)
             .replace(/\${name}/g, e.name)
             .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))
             .replace(/\${id}/g, e.id)
             .replace(/\${corum}/g, e.corum)
             .replace(/\${cordois}/g, e.cordois)
             .replace(/\${cortres}/g, e.cortres)
             .replace(/\${dsc}/g, e.dsc)
             .replace(/\${imgdetalheum}/g, e.imgdetalheum)
             .replace(/\${imgdetalhedois}/g, e.imgdetalhedois)
             .replace(/\${imgdetalhetres}/g, e.imgdetalhetres)
             

             // botão ver mais foi clicado (12 itens)
             if(vermais && i >= 8 && i < 12) {
                $("#itensVitrine").append(temp)
             }

             // paginação inicial (8 itens)
             if (!vermais && i < 8) {
                $("#itensVitrine").append(temp)
             }
 
         })

         // remove o ativo 
         $(".container-menu a").removeClass('active');

         // seta o menu para ativo
         $("#menu-" + categoria).addClass('active');


         // remove o botão de ver mais para itens < 8

         // Conta o número de itens na vitrine
         const numItens = filtro.length;

        // Verifica se a quantidade de itens é menor que 8 e esconde o botão "Ver mais"
        if (numItens <= 8) {
        $("#btnVermais").addClass('hidden');
        } else {
        $("#btnVermais").removeClass('hidden');
        }
    },

    abrirProduto: (id) => {
        window.location.href = `sproduct.html?p=${id}`;
    },

   // carrega os detalhes do produto selecionado
   carregarDetalhesProduto: () =>  {

    PRODUTO = {};
    CATEGORIA_PRODUTO = {};

    var filtro = null;
    
    for (let categoria in MENU) {
        filtro = MENU[categoria].find(item => item.id === ITEM_ID);
        if (filtro) {
            CATEGORIA_PRODUTO = categoria; // Armazena a categoria encontrada
            break;
        }
    }


    if (filtro) {
        PRODUTO = filtro;

        let temp = vitrine.templates.itemDetalhesProduto.replace(/\${img}/g, filtro.img)
            .replace(/\${imgdetalheum}/g, filtro.imgdetalheum)
            .replace(/\${imgdetalhedois}/g, filtro.imgdetalhedois)
            .replace(/\${imgdetalhetres}/g, filtro.imgdetalhetres)
            .replace(/\${name}/g, filtro.name)
            .replace(/\${price}/g, filtro.price.toFixed(2).replace('.', ','))
            .replace(/\${id}/g, filtro.id)
            .replace(/\${corum}/g, filtro.corum)
            .replace(/\${cordois}/g, filtro.cordois)
            .replace(/\${cortres}/g, filtro.cortres)
            .replace(/\${dsc}/g, filtro.dsc);

        $("#itensVitrineDetalhe").append(temp);

    } 
    // else {
    //     console.log('Produto não encontrado');
    // }

    vitrine.metodos.variacaoProduto();

   },

    //Selecionar a variação do produto
    variacaoProduto: () => {

    var MainImg = document.getElementById("MainImg");
    var smallimg = document.getElementsByClassName("small-img");

    smallimg[0].onclick = function () {
        MainImg.src = smallimg[0].src;
    }
    smallimg[1].onclick = function () {
        MainImg.src = smallimg[1].src;
    }
    smallimg[2].onclick = function () {
        MainImg.src = smallimg[2].src;
    }
    smallimg[3].onclick = function () {
        MainImg.src = smallimg[3].src;
    }

    },

    //clique no botão de ver mais
    verMais: () => {

        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
        vitrine.metodos.obteritensVitrine(ativo, true);

        $("#btnVermais").addClass('hidden');

    },

    // Diminuir a quantidade de itens no carrinho
    diminunirQuantidade: (id) => {

        let qntdAtual = parseInt($("#qntd-" + id).text());
        
        if (qntdAtual > 0){
            $("#qntd-" + id).text(qntdAtual - 1)
        }

    },

    // Aumentar a quantidade de itens no carrinho
    aumentarQuantidade: (id) => {

        let qntdAtual = parseInt($("#qntd-" + id).text());
        $("#qntd-" + id).text(qntdAtual + 1)
    },

    // adiconar ao carrinho o item da vitrine
    adicionarAoCarrinho: (id) => {

        let qntdAtual = parseInt($("#qntd-" + id).text());

        if (qntdAtual > 0) {

            // obter a categoria do produto
            var categoria = CATEGORIA_PRODUTO;

            // obter a lista ativa
            let filtro = MENU[categoria];

            // obtem o item 
            let item = $.grep(filtro, (e, i) => { return e.id == id});

            if (item.length > 0) {

                // Obter os valores das opções selecionadas
                let corSelecionada = $("#" + id + " select").eq(0).val(); // Cor
                let tamanhoSelecionado = $("#" + id + " select").eq(1).val(); // Tamanho

                // Validação: Certificar-se de que o usuário selecionou uma cor e um tamanho válidos
                if (corSelecionada === "Cor") {
                    vitrine.metodos.mensagem('Por favor, selecione uma cor.', 'red');
                    return;
                }
                if (tamanhoSelecionado === "Tamanho") {
                    vitrine.metodos.mensagem('Por favor, selecione um tamanho.', 'red');
                    return;
                }

                // // validar se já existe esse item no carrinho com a mesma cor e tamanho
                let existe = $.grep(MEU_CARRINHO, (elem, index) => { 
                    return elem.id == id && elem.corSelecionada == corSelecionada && elem.tamanho == tamanhoSelecionado;                    
                });

                // Caso já exista o item no carrinho com a mesma cor e tamanho, só altera a quantidade
                if (existe.length > 0) {
                    let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id && obj.corSelecionada == corSelecionada && obj.tamanho == tamanhoSelecionado));
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
                }
                // Caso não exista o item no carrinho, adiciona ele
                else {
                    let novoItem = { ...item[0] }; // Clona o objeto para não alterar o original
                    novoItem.qntd = qntdAtual;
                    novoItem.corSelecionada = corSelecionada;
                    novoItem.tamanho = tamanhoSelecionado;
                    MEU_CARRINHO.push(novoItem);
                }


                vitrine.metodos.mensagem('Item adicionado ao carrinho!', 'green')
                $("#qntd-" + id).text(0)

                vitrine.metodos.atualizarBadgeTotal();

            }

        }

        // Salvar carrinho no localStorage
        localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    },

    // adiconar ao carrinho os itens em destaque
    // adicionarAoCarrinhoIndex: (id) => {

    //     let qntdAtual = parseInt($("#qntd-" + id).text());

    //     if (qntdAtual > 0) {

    //         // obtem a lista de itens
    //         let filtro = MENU['destaque'];

    //         // obtem o item 
    //         let item = $.grep(filtro, (e, i) => { return e.id == id});

    //         if (item.length > 0) {

    //             // validar se já existe esse item no carrinho
    //             let existe = $.grep(MEU_CARRINHO, (elem, index) => { return elem.id == id});

    //              // caso já exista o item no carrinho só altera a qntd
    //             if (existe.length > 0) {
    //                 let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
    //                 MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
    //             }
    //             // caso não exista o item no carrinho, adiciona ele
    //             else{
    //                 item[0].qntd = qntdAtual;
    //                 MEU_CARRINHO.push(item[0])
    //             }

    //             vitrine.metodos.mensagem('Item adicionado ao carrinho!', 'green')
    //             $("#qntd-" + id).text(0)

    //             vitrine.metodos.atualizarBadgeTotal();

    //         }

    //     }

    //     // Salvar carrinho no localStorage
    //     localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    // },

    // // adiconar ao carrinho os itens recem chegados
    // adicionarAoCarrinhoRecem: (id) => {

    //     let qntdAtual = parseInt($("#qntd-" + id).text());

    //     if (qntdAtual > 0) {

    //         // obtem a lista de itens
    //         let filtro = MENU['recemchegadas'];

    //         // obtem o item 
    //         let item = $.grep(filtro, (e, i) => { return e.id == id});

    //         if (item.length > 0) {

    //             // validar se já existe esse item no carrinho
    //             let existe = $.grep(MEU_CARRINHO, (elem, index) => { return elem.id == id});

    //              // caso já exista o item no carrinho só altera a qntd
    //             if (existe.length > 0) {
    //                 let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
    //                 MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
    //             }
    //             // caso não exista o item no carrinho, adiciona ele
    //             else{
    //                 item[0].qntd = qntdAtual;
    //                 MEU_CARRINHO.push(item[0])
    //             }

    //             vitrine.metodos.mensagem('Item adicionado ao carrinho!', 'green')
    //             $("#qntd-" + id).text(0)

    //             vitrine.metodos.atualizarBadgeTotal();

    //         }

    //     }

    //     // Salvar carrinho no localStorage
    //     localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    // },

    // Função para carregar itens do localStorage ao iniciar a página
    
    
    carregarCarrinhoDoLocalStorage: () => {
    const carrinhoSalvo = localStorage.getItem('meuCarrinho');

    // Verificar se há algo salvo no localStorage
    if (carrinhoSalvo) {
        MEU_CARRINHO = JSON.parse(carrinhoSalvo);

        vitrine.metodos.atualizarBadgeTotal();
    }
    },
    

    // atualiza o badge de totais dos botões "Meu carrinho"
    atualizarBadgeTotal: () => {

        var total = 0;

        $.each(MEU_CARRINHO, (i, e) => {
            total += e.qntd
        })

        if (total > 0) {
            $(".botao-bag").removeClass('hidden');
            $(".container-total-bag").removeClass('hidden');
        }
        else {
            $(".botao-bag").addClass('hidden');
            $(".container-total-bag").addClass('hidden');
        }

        $(".badge-total-bag").html(total);
    },


    // abrir a modal carrinho
    abrirCarrinho: (abrir) => {

        if (abrir) {
            $("#modalCarrinho").removeClass('hidden');
            vitrine.metodos.carregarCarrinho();
        }
        else {
            $("#modalCarrinho").addClass('hidden');
        }
    },
    

    // altera os textos e exibe os botões da etapa
    carregarEtapa: (etapa) => {

        if (etapa == 1) {
            $("#lblTituloEtapa").text('Seu carrinho:');
            $("#itensCarrinho").removeClass('hidden');
            $("#LocalEntrega").addClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa1").addClass('active');

            $("#btnEtapaPedido").removeClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").addClass('hidden');
        }

        if (etapa == 2) {
            $("#lblTituloEtapa").text('Endereço de entrega:');
            $("#itensCarrinho").addClass('hidden');
            $("#LocalEntrega").removeClass('hidden');
            $("#resumoCarrinho").addClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa1").addClass('active');
            $(".etapa2").addClass('active');

            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").removeClass('hidden');
            $("#btnEtapaResumo").addClass('hidden');
            $("#btnVoltar").removeClass('hidden');
        }

        if (etapa == 3) {
            $("#lblTituloEtapa").text('Resumo do pedido:');
            $("#itensCarrinho").addClass('hidden');
            $("#LocalEntrega").addClass('hidden');
            $("#resumoCarrinho").removeClass('hidden');

            $(".etapa").removeClass('active');
            $(".etapa1").addClass('active');
            $(".etapa2").addClass('active');
            $(".etapa3").addClass('active');

            $("#btnEtapaPedido").addClass('hidden');
            $("#btnEtapaEndereco").addClass('hidden');
            $("#btnEtapaResumo").removeClass('hidden');
            $("#btnVoltar").removeClass('hidden');
        }
    },


    //botão de voltar etapa
    voltarEtapa: () => {

        let etapa = $(".etapa.active").length;
        vitrine.metodos.carregarEtapa(etapa - 1);

    },


    // carrega a lista de itens do carrinho
    carregarCarrinho: () => {

        vitrine.metodos.carregarEtapa(1);

        if(MEU_CARRINHO.length > 0) {

            $("#itensCarrinho").html('');

            $.each(MEU_CARRINHO, (i, e) => {

                let temp = vitrine.templates.itemCarrinho.replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${cor}/g, e.corSelecionada)
                .replace(/\${tamanho}/g, e.tamanho)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.',','))
                .replace(/\${id}/g, e.id)
                .replace(/\${qntd}/g, e.qntd)

                $("#itensCarrinho").append(temp);

                 // último item
                 if ((i + 1) == MEU_CARRINHO.length) {
                    vitrine.metodos.carregarValores();
                 }   

            })

        }
        else {
            $("#itensCarrinho").html('<p class="carrinho-vazio"><i class="fa fa-shopping-bag"></i>Seu carrinho está vazio!</p>');
            vitrine.metodos.carregarValores();
        }

    },

    // diminui a qntd do item no carrinho
    diminunirQuantidadeCarrinho: (id, corSelecionada, tamanho) => {

        let qntdAtual = parseInt($("#qntd-carrinho-" + id + "-" + corSelecionada + "-" + tamanho).text());
        
        if (qntdAtual > 1){
            $("#qntd-carrinho-" + id + "-" + corSelecionada + "-" + tamanho).text(qntdAtual - 1);
            vitrine.metodos.atualizarCarrinho(id, corSelecionada, tamanho, qntdAtual - 1);

            // Salvar carrinho no localStorage após a atualização
            localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
        }
        else {
            vitrine.metodos.removerItemCarrinho(id, corSelecionada, tamanho);
        }
    },


    // aumenta a qntd do item no carrinho
    aumentarQuantidadeCarrinho: (id, corSelecionada, tamanho) => {

        let qntdAtual = parseInt($("#qntd-carrinho-" + id + "-" + corSelecionada + "-" + tamanho).text());

        $("#qntd-carrinho-" + id + "-" + corSelecionada + "-" + tamanho).text(qntdAtual + 1)
        vitrine.metodos.atualizarCarrinho(id, corSelecionada, tamanho, qntdAtual + 1);

        // Salvar carrinho no localStorage após a atualização
        localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    },


    // remover item do carrinho
    removerItemCarrinho: (id, corSelecionada, tamanho) => {

        MEU_CARRINHO = $.grep(MEU_CARRINHO, (e) => { return !(e.id == id && e.corSelecionada == corSelecionada && e.tamanho == tamanho)});
        vitrine.metodos.carregarCarrinho();

        // atualiza o botão carrinho com a qntd atualizada
        vitrine.metodos.atualizarBadgeTotal();

        // Salvar carrinho no localStorage após a atualização
        localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    },


    // atualiza a antd de itens do carrinho
    atualizarCarrinho: (id, corSelecionada, tamanho, qntd) => {

        let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id && obj.corSelecionada == corSelecionada && obj.tamanho == tamanho));
        MEU_CARRINHO[objIndex].qntd = qntd;

        // atualiza o botão carrinho com a qntd atualizada
        vitrine.metodos.atualizarBadgeTotal();

        // atualiza os valores (R$) totais do carrinho
        vitrine.metodos.carregarValores();

        // Salvar carrinho no localStorage após a atualização
        localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    },


    // carrega os valores de Subtotal, Entrega e Total
    carregarValores: () => {

        VALOR_CARRINHO= 0;

        $("#lblSubtotal").text('R$ 0,00');
        $("#lblValorEntrega").text('+ R$ 0,00');
        $("#lblValorTotal").text('R$ 0,00');

        $.each(MEU_CARRINHO, (i, e) => {

            VALOR_CARRINHO += parseFloat(e.price * e.qntd);

            if ((i + 1) == MEU_CARRINHO.length) {
                $("#lblSubtotal").text(`R$ ${VALOR_CARRINHO.toFixed(2).replace('.',',')}`);
                $("#lblValorEntrega").text(`+ R$ ${(VALOR_ENTREGA).toFixed(2).replace('.',',')}`);
                $("#lblValorTotal").text(`R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace('.',',')}`);
            }
        })

        // Salvar carrinho no localStorage após a atualização
        localStorage.setItem('meuCarrinho', JSON.stringify(MEU_CARRINHO));
    },


    // carregar a etapa endereço
    carregarEndereco: () => {

        if (MEU_CARRINHO.length <= 0) {
            vitrine.metodos.mensagem('Seu carrinho está vazio!')
            return;
        }

        vitrine.metodos.carregarEtapa(2);
    },


    // API ViaCEP
    buscarCep: () => {

        // cria a variavel com o valor do cep
        var cep = $("#txtCEP").val().trim().replace(/\D/g, '');

        // verifica se o CEP possui valor informado
        if (cep != "") {

            // Expressão regular para validar CEP
            var validacep = /^[0-9]{8}/;

            if (validacep.test(cep)) {

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {

                        // atualia os campos com os valores retornados
                        $("#txtEndereco").val(dados.logradouro);
                        $("#txtBairro").val(dados.bairro);
                        $("#txtCidade").val(dados.localidade);
                        $("#ddlUF").val(dados.uf);
                        $("#txtNumero").focus();
                    }
                    else {
                        vitrine.metodos.mensagem('CEP não encontrado. Preencha as informações manualmente.');
                        $("#txtEndereco").focus();
                    }

                })
            }
            else{
                vitrine.metodos.mensagem('Formato de CEP inválido.');
                $("#txtCEP").focus();
            }

        }
        else {
            vitrine.metodos.mensagem('Informe o CEP, por favor.');
            $("#txtCEP").focus();
        }
    },


    //validação antes de prosseguir para a etapa 3
    resumoPedido: () => {

        let cep = $("#txtCEP").val().trim();
        let endereco = $("#txtEndereco").val().trim();
        let bairro = $("#txtBairro").val().trim();
        let cidade = $("#txtCidade").val().trim();
        let uf = $("#ddlUF").val().trim();
        let numero = $("#txtNumero").val().trim();
        let complemento = $("#txtComplemento").val().trim();

        if(cep.length <= 0) {
            vitrine.metodos.mensagem('Informe o CEP, por favor.');
            $("#txtCEP").focus();
            return;
        }

        if(endereco.length <= 0) {
            vitrine.metodos.mensagem('Informe o endereço, por favor.');
            $("#txtEndereco").focus();
            return;
        }

        if(bairro.length <= 0) {
            vitrine.metodos.mensagem('Informe o bairro, por favor.');
            $("#txtBairro").focus();
            return;
        }

        if(cidade.length <= 0) {
            vitrine.metodos.mensagem('Informe a cidade, por favor.');
            $("#txtCidade").focus();
            return;
        }

        if(uf == "-1") {
            vitrine.metodos.mensagem('Informe a UF, por favor.');
            $("#ddlUF").focus();
            return;
        }

        if(numero.length <= 0) {
            vitrine.metodos.mensagem('Informe o número, por favor.');
            $("#txtNumero").focus();
            return;
        }

        MEU_ENDERECO =  {
            cep: cep,
            endereco: endereco,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            numero: numero,
            complemento: complemento 
        }

        vitrine.metodos.carregarEtapa(3);
        vitrine.metodos.carregarResumo();

    },


    // carrega a etapa de resumo do pedido
    carregarResumo: () => {

        $("#listaItensResumo").html('');

        $.each(MEU_CARRINHO, (i, e) => {

            let temp = vitrine.templates.itemResumo.replace(/\${img}/g, e.img)
                .replace(/\${nome}/g, e.name)
                .replace(/\${cor}/g, e.corSelecionada)
                .replace(/\${tamanho}/g, e.tamanho)
                .replace(/\${preco}/g, e.price.toFixed(2).replace('.',','))
                .replace(/\${qntd}/g, e.qntd)

                $("#listaItensResumo").append(temp);

        });

        $("#resumoEndereco").html(`${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`);
        $("#cidadeEndereco").html(`${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} ${MEU_ENDERECO.complemento}`);

        vitrine.metodos.finalizarPedido();
     },


     // Atualiza o link do botão WhatsApp
     finalizarPedido: () => {

        if (MEU_CARRINHO.length > 0 && MEU_CARRINHO != null) {

            var texto = 'Olá! gostaria de fazer um pedido:';
            texto += `\n*Itens do pedido:*\n\n\${itens}`;
            texto += '\n*Endereço de entrega:*';
            texto += `\n${MEU_ENDERECO.endereco}, ${MEU_ENDERECO.numero}, ${MEU_ENDERECO.bairro}`;
            texto += `\n${MEU_ENDERECO.cidade}-${MEU_ENDERECO.uf} / ${MEU_ENDERECO.cep} ${MEU_ENDERECO.complemento}`;
            texto += `\n\n*Total (com entrega): R$ ${(VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace('.',',')}*`;

            var itens = '';

            $.each(MEU_CARRINHO, (i, e) => {

                itens += `*${e.qntd}x* ${e.name} ${e.corSelecionada}, Tamanho: ${e.tamanho} ....... R$ ${e.price.toFixed(2).replace('.',',')} \n`;

                if ((i + 1) == MEU_CARRINHO.length) {

                    // ultimo item
                    texto = texto.replace(/\${itens}/g, itens);

                    // converte a URL
                   let encode = encodeURI(texto);
                   let URL = `https://wa.me/${CELULAR_EMPRESA}?text=${encode}`;

                   $("#btnEtapaResumo").attr('href', URL);

                }

            })

        }
     },


    mensagem: (texto, cor = 'red', tempo = 3500) => {

       let id = Math.floor(Date.now() * Math.random()).toString();

       let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;

       $("#container-mensagens").append(msg);

       setTimeout(() => {
        $("#msg-" + id).removeClass('fadeInDown');
        $("#msg-" + id).addClass('fadeOutUp');
        setTimeout(() => {
            $("#msg-" + id).remove();
        }, 800);
       }, tempo)
    }

};




//Templates itens da vitrine
vitrine.templates = {


    item: `
    <div class="pro">
        <div id="\${id}">
        <img src="\${img}" onclick="vitrine.metodos.abrirProduto('\${id}')"/>
                <div class="des">
                    <span>Coleção farm</span>
                    <h5>\${name}</h5>
                    <h4>R$ \${price}</h4>
                </div>
                <a class= "btn-add" onclick="vitrine.metodos.abrirProduto('\${id}')"><i class="fas fa-shopping-bag cart"></i></a>
        </div>        
    </div>
    `,

    itemIndex: `
    <div class="pro">
        <div id="\${id}">
        <img src="\${img}" onclick="vitrine.metodos.abrirProduto('\${id}')"/>
                <div class="des">
                    <span>Coleção farm</span>
                    <h5>\${name}</h5>
                    <h4>R$ \${price}</h4>
                </div>
                <a class "btn-add" onclick="vitrine.metodos.abrirProduto('\${id}')"><i class="fas fa-shopping-bag cart"></i></a>
        </div>        
    </div>
    `,

    itemIndexRecem: `
    <div class="pro">
        <div id="\${id}">
        <img src="\${img}" onclick="vitrine.metodos.abrirProduto('\${id}')"/>
                <div class="des">
                    <span>Coleção farm</span>
                    <h5>\${name}</h5>
                    <h4>R$ \${price}</h4>
                </div>
                <a class "btn-add" onclick="vitrine.metodos.abrirProduto('\${id}')"><i class="fas fa-shopping-bag cart"></i></a>
        </div>        
    </div>
    `,

    itemCarrinho: `
    <div class="col-12 item-carrinho">
                        <div class="img-produto">
                            <img src="\${img}" />
                        </div>
                        <div class="dados-produto">
                            <p class="title-produto"><b>\${name}</b></p>
                            <p class="cor-produto"><b>Cor: \${cor}</b></p>
                            <p class="tamanho-produto"><b>Tamanho: \${tamanho}</b></p>
                            <p class="price-produto"><b>R$ \${price}</b></p>
                        </div>
                        <div class="add-carrinho">
                            <span class="btn-menos" onclick="vitrine.metodos.diminunirQuantidadeCarrinho('\${id}', '\${cor}', '\${tamanho}')"><i
                                    class="fa fa-minus"></i></span>
                            <span class="add-numero-itens" id="qntd-carrinho-\${id}-\${cor}-\${tamanho}">\${qntd}</span>
                            <span class="btn-mais" onclick="vitrine.metodos.aumentarQuantidadeCarrinho('\${id}', '\${cor}', '\${tamanho}')"><i
                                    class="fa fa-plus"></i></span>
                            &nbsp; &nbsp; &nbsp;<span class="btn btn-remove no-mobile"
                                onclick="vitrine.metodos.removerItemCarrinho('\${id}', '\${cor}', '\${tamanho}')"><i class="fa fa-times"></i></span>
                        </div>
                    </div>
    `,

    itemResumo: `
        <div class="col-12 item-carrinho resumo">
        <div class="img-produto-resumo">
            <img src="\${img}" />
        </div>
        <div class="dados-produto">
            <p class="title-produto-resumo">
                <b>\${nome}</b>
            </p>
            <p class="cor-produto">
                <b>Cor: \${cor}</b>
            </p>
            <p class="tamanho-produto">
                <b>Tamanho: \${tamanho}</b>
            </p>
            <p class="price-produto-resumo">
                <b>\${preco}</b>
            </p>
        </div>
        <p class="quantidade-produto-resumo">
            x <b>\${qntd}</b>
        </p>
        </div>            
`, 
    itemDetalhesProduto: `

<div class="detalhe" id="\${id}">
                    <div class="single-pro-image">
                        <img class="mb-2" src="\${img}" width="100%" id="MainImg" />
                        <div class="small-img-group">
                            <div class="small-img-col">
                                <img src="\${img}" width="100%" class="small-img" />
                            </div>
                            <div class="small-img-col">
                                <img src="\${imgdetalheum}" width="100%" class="small-img" />
                            </div>
                            <div class="small-img-col">
                                <img src="\${imgdetalhedois}" width="100%" class="small-img" />
                            </div>
                            <div class="small-img-col">
                                <img src="\${imgdetalhetres}" width="100%" class="small-img" />
                            </div>
                        </div>
                    </div>
                    <div class="single-pro-details">
                        <h6>Coleção farm</h6>
                        <h4>\${name}</h4>
                        <h2>R$ \${price}</h2>
                        <select>
                            <option>Cor</option>
                            <option>\${corum}</option>
                            <option>\${cordois}</option>
                            <option>\${cortres}</option>
                        </select>
                        
                        <select>
                            <option>Tamanho</option>
                            <option>P</option>
                            <option>M</option>
                            <option>G</option>
                            <option>GG</option>
                        </select>
                        <div class="carrinho-add mt-4">

                            <div class="add-carrinho">
                                <span class="btn-menos" onclick="vitrine.metodos.diminunirQuantidade('\${id}')"><i class="fa fa-minus"></i></span>
                                <span class="add-numero-itens" id="qntd-\${id}">0</span>
                                <span class="btn-mais" onclick="vitrine.metodos.aumentarQuantidade('\${id}')"><i class="fa fa-plus"></i></span>
                            </div>
                           &nbsp;  &nbsp;  &nbsp;
                           <a class= "btn-add" onclick="vitrine.metodos.adicionarAoCarrinho('\${id}')"><i class="fas fa-shopping-bag cart"></i></a>
                           
                        </div>
                        <h4>Detalhes do Produto</h4>
                        <span>\${dsc}</span>
                    </div> 
                </div>
`
}
