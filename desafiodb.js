const cardapio = {
    cafe: { descricao: "Café", valor: 3.00 },
    chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
    suco: { descricao: "Suco Natural", valor: 6.20 },
    sanduiche: { descricao: "Sanduíche", valor: 6.50 },
    queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
    salgado: { descricao: "Salgado", valor: 7.25 },
    combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
    combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
  };
  
  // Formas de pagamento
  const formasPagamento = ["dinheiro", "debito", "credito"];
  
  function calcularValorCompra(pedido, formaPagamento) {
    if (!formasPagamento.includes(formaPagamento)) {
      return "Forma de pagamento inválida!";
    }
  
    let valorTotal = 0;
  
    for (const item of pedido) {
      const codigo = item.codigo;
      const quantidade = item.quantidade || 1;
  
      if (!cardapio[codigo]) {
        return "Item inválido!";
      }
  
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }
  
      const valorItem = cardapio[codigo].valor * quantidade;
      valorTotal += valorItem;
  
      if (codigo === "chantily" || codigo === "queijo") {
        if (!pedido.some(item => item.codigo === codigo.replace("extra", ""))) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }
  
    if (valorTotal === 0) {
      return "Não há itens no carrinho de compra!";
    }
  
    if (formaPagamento === "dinheiro") {
      valorTotal *= 0.95; // Aplicar desconto de 5%
    } else if (formaPagamento === "credito") {
      valorTotal *= 1.03; // Aplicar acréscimo de 3%
    }
  
    return valorTotal.toFixed(2);
  }
  
  const pedidoExemplo = [
    { codigo: "cafe", quantidade: 2 },
    { codigo: "chantily" },
    { codigo: "combo1" }
  ];
  
  const formaPagamentoExemplo = "dinheiro";
  
  const valorCompra = calcularValorCompra(pedidoExemplo, formaPagamentoExemplo);
  console.log(`Valor da compra: R$ ${valorCompra}`);
  