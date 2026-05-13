const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Отдаем index.html при любом GET-запросе
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});