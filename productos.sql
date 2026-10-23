DROP PROCEDURE IF EXISTS db_consultar_productos;
DROP PROCEDURE IF EXISTS db_registrar_producto;

DELIMITER //

CREATE PROCEDURE db_consultar_productos()
BEGIN
    SELECT id_producto, id_categoria, nombre_producto, precio_unitario,
           costo_proveedor, ubicacion_pasillo
    FROM productos
    ORDER BY id_producto;
END//

CREATE PROCEDURE db_registrar_producto(
    IN p_id_categoria INT,
    IN p_nombre_producto VARCHAR(100),
    IN p_precio_unitario INT,
    IN p_costo_proveedor INT,
    IN p_ubicacion_pasillo VARCHAR(10)
)
BEGIN
    INSERT INTO productos (
        id_categoria, nombre_producto, precio_unitario,
        costo_proveedor, ubicacion_pasillo
    )
    VALUES (
        p_id_categoria, p_nombre_producto, p_precio_unitario,
        p_costo_proveedor, p_ubicacion_pasillo
    );

    SELECT id_producto, id_categoria, nombre_producto, precio_unitario,
           costo_proveedor, ubicacion_pasillo
    FROM productos
    WHERE id_producto = LAST_INSERT_ID();
END//

DELIMITER ;