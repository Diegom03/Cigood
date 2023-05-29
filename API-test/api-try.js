const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id:1, name: 'Jorge', age: 20, enroll: true},
    {id:2, name: 'Lucas', age: 25, enroll: false},
    {id:3, name: 'Pedro', age: 30, enroll: true},
]


app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: student.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.age === 'true')
    }

    student.push(student);
    res.send(student);
});


app.delete('/api/students/:id', (req, res) => {
    const student = student.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('estudiante no encontrado');

    const index = student.indexOf(student);
    student.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));