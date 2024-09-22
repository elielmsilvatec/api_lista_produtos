const express = require("express");
const Categoria = require("../Model/CategoriaModel"); // Importar o modelo Categoria

const router = express.Router();

// Rota para criar uma nova categoria (Create)
router.post("/categoria/criar", async (req, res) => {
  const { nome } = req.body;

  try {
    const novaCategoria = await Categoria.create({ nome });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
});

// Rota para listar todas as categorias (Read)
router.get("/categoria/listar", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar categorias" });
  }
});

// Rota para buscar uma categoria por ID (Read)
router.get("/categoria/buscar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: "Categoria não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
});

// Rota para atualizar uma categoria por ID (Update)
router.put("/categoria/atualizar/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const categoria = await Categoria.findByPk(id);

    if (categoria) {
      categoria.nome = nome;
      await categoria.save();
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: "Categoria não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
});

// Rota para deletar uma categoria por ID (Delete)
router.delete("/categoria/deletar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (categoria) {
      await categoria.destroy();
      res.status(204).json(); // Sucesso, sem conteúdo
    } else {
      res.status(404).json({ error: "Categoria não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar categoria" });
  }
});

module.exports = router;
