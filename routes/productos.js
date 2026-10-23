import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const [resultsets] = await pool.query('CALL db_consultar_productos()');
        const productos = resultsets[0] ?? [];

        return res.status(200).json({
            status: 'success',
            total_registros: productos.length,
            data: productos
        });
    } catch (error) {
        console.error('Error en GET /productos:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Error al consultar productos'
        });
    }
});

router.post('/', async (req, res) => {
    const {
        id_categoria,
        nombre_producto,
        precio_unitario,
        costo_proveedor,
        ubicacion_pasillo = null
    } = req.body ?? {};

    if (!Number.isInteger(id_categoria) || id_categoria <= 0 ||
        typeof nombre_producto !== 'string' || !nombre_producto.trim() || nombre_producto.length > 100 ||
        !Number.isInteger(precio_unitario) || precio_unitario < 0 ||
        !Number.isInteger(costo_proveedor) || costo_proveedor < 0 ||
        (ubicacion_pasillo !== null && (typeof ubicacion_pasillo !== 'string' || ubicacion_pasillo.length > 10))) {
        return res.status(400).json({
            error: 'Bad request',
            message: 'id_categoria, nombre_producto, precio_unitario y costo_proveedor son obligatorios; revisa sus tipos y longitudes'
        });
    }

    try {
        const [resultsets] = await pool.query(
            'CALL db_registrar_producto(?, ?, ?, ?, ?)',
            [id_categoria, nombre_producto.trim(), precio_unitario, costo_proveedor, ubicacion_pasillo]
        );
        const producto = resultsets[0]?.[0];

        return res.status(201).json({
            status: 'created',
            data: producto
        });
    } catch (error) {
        console.error('Error en POST /productos:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                error: 'Bad request',
                message: 'La categoría indicada no existe'
            });
        }
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Error al guardar el producto'
        });
    }
});

export default router;


