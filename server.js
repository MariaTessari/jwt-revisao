import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser'

const PORT = 3000;
const JWT_SECRET = 'test1923474urbvg43orf0osdfh0'

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true
}))
    


app.use(cookieParser())

function autenticarUsuario(req, res, next){
    const token = req.cookies.token;

    if(token){
        return res.status(401).json({message: "Acesso negado"})
    }
    try{
        const usuario = jwt.verify(token, JWT_SECRET)
        req.usuario = usuario
        next();
    }catch(error){
        return res.status(403).json({message: "Token inválido ou expirado"})
    }
}

app.post("/register", async (req, res)=>{
    const {email, senha, cpf}= req.body;

}) 

app.post("/login", async(req, res)=>{
    const token = jwt.sign(
        {id:cliente.id},
        JWT_SECRET,
        { expiresIn: "1h" },
    );

    res.cookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    })

    res.json({message: "Login realizado com sucesso!!!"})
});

app.get("/faturamento", autenticarUsuario, async(req, res)=>{
    res.json({message: "Meu faturamento"})
})


app.listen(PORT, ()=>{
    console.log("API rodando")
})
