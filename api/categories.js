module.exports = (app) => {

    const get = async (req, res) => {
        
        const categories = await app.database("categories").select('*'); //pegou todas as categorias no db

        return res.json(categories);
    }

    const getById = async (req, res) => {

        const idCategory = req.params.id;

        if (!idCategory) {
            return res.status(400).json({ error: "Id da categoria não informado!" });
        }
        
        const categoryExists = await app.database('categories').where({ id: idCategory }).first();

        if (!categoryExists) {
            return res.status(400).json({ error: "Categoria não encontrada!" });
        }

        const category = await app.database('categories').where({ id: idCategory }).first();

        return res.json(category);
    }

    const save = async (req, res) => {

        const category = { ...req.body };

        if (req.params.id) {
            category.id = req.params.id
        }

        if (!category.name) {
            return res.status(400).json({ error: "Nome da categoria não informado" });
        }

        const categoryExists = await app // await e async foram utilizados para que ele espere o resultado do db para poder fazer a verificação no if abaixo
            .database("categories")
            .where({ name: category.name })
            .first();

        if (categoryExists) {
            return res.status(400).json({ error: "A categoria já existe" });
        }

        category.image = "category.png";

        if (category.id) {

            await app
                .database("categories")
                .update(category) // inseriu na database categories 
                .where({ id: category.id  })
                .then((_) => res.status(200).send()) // then((_)) apenas a mensagem de sucesso 
                // 201 é status de criação 
                .catch((err) => res.status(500).send(err));

        } else {

            await app
                .database("categories")
                .insert(category) // inseriu na database categories 
                .then((_) => res.status(200).send()) // then((_)) apenas a mensagem de sucesso 
                .catch((err) => res.status(500).send(err));
        }


    }

    const remove = async (req, res) => {
        
        const idCategory = req.params.id;

        if (!idCategory) {
            return res.status(400).json({ error: "Id da categoria não informado!" });
        }
        
        const categoryExists = await app.database('categories').where({ id: idCategory }).first();
        // acessa o banco de dados e verifica se existe 
        
        if (!categoryExists) {
            return res.status(400).json({ error: "Categoria não encontrada!" });
        }

        await app.database('categories').where({ id: idCategory }).del();

        res.status(204).send(); 
        // o send irá enviar apenas o status 204
    }

    return { get, getById, save, remove }
}