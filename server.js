import express from 'express';
import ventasRoutes from './routes/ventas.js';
import productosRoutes from './routes/productos.js';
import 'dotenv/config';

const app = express();
// 1.middlerware para procesar req.body
app.use(express.json());

//2. montamos las rutas con el prefijo /api/v1/ventas
app.use('/api/v1/ventas', ventasRoutes);
app.use('/api/v1/productos', productosRoutes);


// 3. Iniciar Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor Express en http://localhost:${PORT}')
});


