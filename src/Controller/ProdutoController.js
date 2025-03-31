const express = require("express");
const Produto = require("../Model/ProdutoModel");
const Categoria = require("../Model/CategoriaModel");
const yup = require("yup");

const router = express.Router();

// Esquema de validação com Yup
const produtoSchema = yup.object({
  nome: yup.string().required("O nome do produto é obrigatório").trim().email("Digite um e-mail válido!"),
  quantidade: yup
    .number()
    .integer("A quantidade deve ser um número inteiro")
    .positive("A quantidade deve ser um número positivo")
    .required("A quantidade é obrigatória"),
  observacoes: yup.string().nullable(), // Permite nulo para observações opcionais
  categoriaId: yup
    .number()
    .integer("O ID da categoria deve ser um número inteiro")
    .positive("O ID da categoria deve ser um número positivo")
    .required("O ID da categoria é obrigatório"),
});

// Rota para criar um novo produto (Create)
router.post("/", async (req, res) => {
  const { nome, quantidade, observacoes, categoriaId } = req.body;

  try {
    // Validação dos dados usando Yup
    await produtoSchema.validate(req.body, { abortEarly: false }); // abortEarly: false para retornar todos os erros

    const novoProduto = await Produto.create({
      nome,
      quantidade,
      observacoes,
      categoriaId,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Se for um erro de validação do Yup
      const errors = error.errors; // Array de mensagens de erro
      return res.status(400).json({ errors }); // Retorna um array de erros
    } else {
      // Se for outro tipo de erro (ex: erro no banco de dados)
      console.error("Erro ao criar produto:", error); // Log para depuração
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  }
});

// Rota para listar todos os produtos (Read)
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: [Categoria], // Incluir categoria associada
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
      include: [Categoria], // Incluir categoria associada
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
      res.status(204).json(); // Sucesso, sem conteúdo
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

module.exports = router;
