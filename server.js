import express from 'express';
const app = express();
const port = 3000;
const __dirname__ = import.meta.dirname;
import register from './routes/register.js';
import project from './routes/project.js';
import login from './routes/login.js';

app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({limit : "50mb", extended : true}));
app.use('/register', register);
app.use('/project', project);
app.use('/login', login);

app.get('/', (req, res)=>{
    res.sendFile('./frontend/index.html', {root : __dirname__})
});

app.use(express.static('./frontend'));

app.listen(port, ()=>{
    console.log("Sever Intiallized Successfully!");
})