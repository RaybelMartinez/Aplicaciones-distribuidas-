const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

/*
 Estructura general de respuesta:
 {
   ok: true/false,
   resultado: ...
   error: ...
 }
*/

// i) mascaracaracteres
app.post('/mascaracaracteres', (req, res) => {
    const { cad1, cad2 } = req.body;

    if (typeof cad1 !== 'string' || typeof cad2 !== 'string') {
        return res.json({ ok: false, error: 'Faltan parámetros' });
    }

    const resultado = cad1.length >= cad2.length ? cad1 : cad2;
    res.json({ ok: true, resultado });
});

// ii) menoscaracteres
app.post('/menoscaracteres', (req, res) => {
    const { cad1, cad2 } = req.body;

    if (typeof cad1 !== 'string' || typeof cad2 !== 'string') {
        return res.json({ ok: false, error: 'Faltan parámetros' });
    }

    const resultado = cad1.length <= cad2.length ? cad1 : cad2;
    res.json({ ok: true, resultado });
});

// iii) numcaracteres
app.post('/numcaracteres', (req, res) => {
    const { cadena } = req.body;

    if (typeof cadena !== 'string') {
        return res.json({ ok: false, error: 'Falta la cadena' });
    }

    res.json({ ok: true, resultado: cadena.length });
});

// iv) palindroma
app.post('/palindroma', (req, res) => {
    const { cadena } = req.body;

    if (typeof cadena !== 'string') {
        return res.json({ ok: false, error: 'Falta la cadena' });
    }

    const limpia = cadena.toLowerCase().replace(/\s+/g, '');
    const esPalindromo = limpia === limpia.split('').reverse().join('');

    res.json({ ok: true, resultado: esPalindromo });
});

// v) concat
app.post('/concat', (req, res) => {
    const { cad1, cad2 } = req.body;

    if (typeof cad1 !== 'string' || typeof cad2 !== 'string') {
        return res.json({ ok: false, error: 'Faltan parámetros' });
    }

    res.json({ ok: true, resultado: cad1 + cad2 });
});

// vi) applysha256
app.post('/applysha256', (req, res) => {
    const { cadena } = req.body;

    if (typeof cadena !== 'string') {
        return res.json({ ok: false, error: 'Falta la cadena' });
    }

    const hash = crypto.createHash('sha256').update(cadena).digest('hex');

    res.json({
        ok: true,
        resultado: {
            original: cadena,
            encriptada: hash
        }
    });
});

// vii) verifysha256
app.post('/verifysha256', (req, res) => {
    const { normal, encriptada } = req.body;

    if (typeof normal !== 'string' || typeof encriptada !== 'string' || !/^[a-fA-F0-9]{64}$/.test(encriptada)) {
        return res.json({ ok: false, error: 'Faltan parámetros' });
    }

    const hash = crypto.createHash('sha256').update(normal).digest('hex');
    const coincide = hash === encriptada.toLowerCase();

    res.json({ ok: true, resultado: coincide });
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor REST escuchando en puerto 3000');
});