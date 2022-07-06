module.exports = (app) => {
    const get = (req, res) => {
        const users = [
            {
                "id": 1,
                "name": "Usuário 1"
            },
            {
                "id": 2,
                "name": "Usuário 2"
            }
        ];

        return res.json(users)
    }

    const save = (req, res) => {

        const user = { ...req.body };

        return res.json(user);
    }

    return { get, save }
}