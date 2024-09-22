const express = require("express");
const Produto = require("../Model/ProdutoModel"); // Importar o modelo Produto
const Categoria = require("../Model/CategoriaModel"); // Importar o modelo Categoria (para incluir na busca)

const router = express.Router();

// Rota para criar um novo produto (Create)
router.post("/", async (req, res) => {
  const { nome, quantidade, observacoes, categoriaId } = req.body;

  try {
    const novoProduto = await Produto.create({ nome, quantidade, observacoes, categoriaId });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Rota para listar todos os produtos (Read)
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: [Categoria]  // Incluir categoria associada
    });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

// Rota para buscar um produto por ID (Read)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id, {
      include: [Categoria]  // Incluir categoria associada
    });

    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// Rota para atualizar um produto por ID (Update)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, observacoes, categoriaId } = req.body;

  try {
    const produto = await Produto.findByPk(id);

    if (produto) {
      produto.nome = nome;
      produto.quantidade = quantidade;
      produto.observacoes = observacoes;
      produto.categoriaId = categoriaId;
      await produto.save();
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

// Rota para deletar um produto por ID (Delete)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);

    if (produto) {
      await produto.destroy();
      res.status(204).json();  // Sucesso, sem conteúdo
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

module.exports = router;
