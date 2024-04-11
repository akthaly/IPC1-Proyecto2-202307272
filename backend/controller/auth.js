let users = [{
    email: "bryan2014ap@gmail.com",
    password: "alejandro"
}]

export const login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario encontrado" });

}