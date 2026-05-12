const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.static('public')); // Папка с фронтендом

// Получить весь прогресс
app.get('/api/progress', async (req, res) => {
    try {
        const data = await prisma.progress.findMany();
        const progressObj = {};
        data.forEach(item => { progressObj[item.termEn] = { score: item.score }; });
        res.json(progressObj);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Сохранить прогресс слова
app.post('/api/progress', async (req, res) => {
    const { termEn, score } = req.body;
    try {
        const updated = await prisma.progress.upsert({
            where: { termEn: termEn },
            update: { score: score },
            create: { termEn: termEn, score: score }
        });
        res.json(updated);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Сброс прогресса
app.post('/api/reset', async (req, res) => {
    await prisma.progress.deleteMany();
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));