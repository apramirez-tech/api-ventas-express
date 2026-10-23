import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();
// 3. Endpoint Get: Consultar consolidado de ventas de parámetro

router.get('/consolidado', async (req, res) => {
    try {
        const { sucursal, anio } = req.query;

        // Validación de parámetros obligatorios
        if (!sucursal || !anio) {
            return res.status(400).json({
                error: "Bad request",
                message: 'debe enviar ambos parámetros'
            });
        }

        // Se ejecuta el SP en BD
        const [rows] = await pool.query('Call db_ventas_tech(?, ?)', [sucursal, anio]);

        //Enviamos la respuesta al cliente
        res.status(200).json({
            status: 'success',
            total_registros: row[0] ? rows[0].length : 0,
            data: rows[0]
        }); l
    } catch (error) {
        console.log('Error en GET /ventas/consolidado', error);
        res.status(500).json({ error: 'Internal server error', message: 'Error en MYSQL' })
    }
})
// 4. Endpoint POST: Ingresar nueva venta
router.post('/', async (req, res) => {
    try {
        const { id_producto, id_cliente, cantidad, fecha_venta } = req.body;
        //Validación de datos
        if (!id_producto || !id_cliente || !cantidad || !fecha_venta) {
            return res.status(400).json({
                error: 'bad request',
                message: 'todos los parámetros son obligatorios'
            });
        }
        //Insertar datos de la BD
        await pool.query('CALL db_registrar_venta(?, ?, ?, ?)', [
            id_producto, id_cliente, cantidad, fecha_venta
        ]);
        //Respuesta 201 Created
        res.status(201).json({
            status: 'created',
            message: 'Venta registrada exitosamente',
            datos_registrados: { id_producto, id_cliente, cantidad, fecha_venta }
        });
    } catch (error) {
        console.log('error en POST /ventas: ', error);
        res.status(500).json({ error: 'Internal Server Error', message: Error })
    }
});

export default router; 