const BASE_URL = "http://localhost:3000";

async function probarEndpoint(nombre, metodo, ruta, datos = null) {
    console.log(`\nProbando: ${nombre}`);

    try {
        const opciones = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (datos !== null) {
            opciones.body = JSON.stringify(datos);
        }

        const respuesta = await fetch(`${BASE_URL}${ruta}`, opciones);
        const texto = await respuesta.text();

        console.log("Método:", metodo);
        console.log("URL:", `${BASE_URL}${ruta}`);
        console.log("Código HTTP:", respuesta.status);

        try {
            console.log("Respuesta:", JSON.parse(texto));
        } catch {
            console.log("Respuesta:", texto);
        }

        if (respuesta.status >= 200 && respuesta.status < 300) {
            console.log("RESULTADO: Solicitud exitosa");
        } else {
            console.log("RESULTADO: La solicitud devolvió un error");
        }

    } catch (error) {
        console.log("No se pudo conectar con el servidor.");
        console.log("Detalle:", error.message);
    }
}

async function ejecutarPruebas() {
    console.log("================================");
    console.log(" PRUEBAS DE LA API REST DE VENTAS");
    console.log("================================");

    // 1. Consultar productos
    await probarEndpoint(
        "Consultar productos",
        "GET",
        "/api/v1/productos"
    );

    // 2. Consultar consolidado de ventas
    await probarEndpoint(
        "Consultar consolidado de ventas",
        "GET",
        "/api/v1/ventas/consolidado?sucursal=Centro&anio=2025"
    );

    // 3. Registrar un producto
    // Cambia id_categoria por una categoría que exista.
    await probarEndpoint(
        "Registrar producto",
        "POST",
        "/api/v1/productos",
        {
            id_categoria: 1,
            nombre_producto: "Producto de prueba",
            precio_unitario: 1000,
            costo_proveedor: 500,
            ubicacion_pasillo: "A1"
        }
    );

    // 4. Registrar una venta
    // Usa un producto y un cliente que existan en tu base de datos.
    await probarEndpoint(
        "Registrar venta",
        "POST",
        "/api/v1/ventas",
        {
            id_producto: 1,
            id_cliente: 1,
            cantidad: 1,
            fecha_venta: "2025-10-15"
        }
    );

    console.log("\n================================");
    console.log(" FIN DE LAS PRUEBAS");
    console.log("================================");
}

ejecutarPruebas();