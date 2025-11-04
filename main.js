async function cargarEstadisticas() {
    try {
        // Consulta a la API
        const response = await fetch('http://127.0.0.1:8000/estadisticas');
        if (!response.ok) throw new Error('Error al obtener estadísticas');
        const data = await response.json();

        // Reemplaza los spinners por los datos obtenidos del backend
        document.getElementById('total-clientes').textContent = data.total_clientes;
        document.getElementById('clientes-sospechosos').textContent =
            data.porcentaje_clientes_sospechosos.toFixed(2) + '%';
        document.getElementById('transacciones-totales').textContent =
            data.total_transacciones;
        document.getElementById('transacciones-por-minuto').textContent =
            Math.round(data.promedio_transacciones_por_minuto);
        // document.getElementById('transacciones-sospechosas').textContent =
        //     data.total_transacciones_sospechosas;
        document.getElementById('transacciones-sospechosas').textContent =
            data.porcentaje_transacciones_sospechosas.toFixed(2) + '%';
    } catch (error) {
        console.error('No se pudieron cargar las estadísticas:', error);

        // Si falla, mostrar en lugar del spinner:
        document.getElementById('total-clientes').textContent = 'Error de carga';
        document.getElementById('transacciones-por-minuto').textContent = 'Error de carga';
        document.getElementById('transacciones-sospechosas').textContent = 'Error de carga';
        document.getElementById('clientes-sospechosos').textContent = 'Error de carga';
    }

    // Cargar gráficos
    // cargarGraficoTransacciones();
    cargarGraficoClientes();
}

// async function cargarGraficoTransacciones() {
//     try {
//         // Consulta a la API
//         const response = await fetch('http://127.0.0.1:8000/anomalias/graficos/transacciones_heatmap?skip=0&limit=530904');
//         if (!response.ok) throw new Error("Error al cargar gráfico");
//         const html = await response.text();
//         const container = document.getElementById("grafico-transacciones2");
//         container.innerHTML = html;

//         // Ejecuta los scripts incluidos en el HTML devuelto
//         const scripts = container.getElementsByTagName("script");
//         for (let i = 0; i < scripts.length; i++) {
//             const script = document.createElement("script");
//             if (scripts[i].src) {
//                 script.src = scripts[i].src;
//             } else {
//                 script.text = scripts[i].innerHTML;
//             }
//             document.body.appendChild(script);
//         }

//     } catch (error) {
//         console.error("No se pudo cargar el gráfico:", error);
//         document.getElementById("grafico-transacciones2").innerHTML = "<p class='text-danger'>Error al cargar gráfico</p>";
//     }
// }

async function cargarGraficoClientes() {
    try {
        // Consulta a la API
        const response = await fetch('http://127.0.0.1:8000/anomalias/graficos/clientes_sospechosos?skip=0&limit=8819');
        if (!response.ok) throw new Error("Error al cargar gráfico");
        const html = await response.text();
        const container = document.getElementById("grafico-clientes");
        container.innerHTML = html;

        // Ejecuta los scripts incluidos en el HTML devuelto
        const scripts = container.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement("script");
            if (scripts[i].src) {
                script.src = scripts[i].src;
            } else {
                script.text = scripts[i].innerHTML;
            }
            document.body.appendChild(script);
        }

    } catch (error) {
        console.error("No se pudo cargar el gráfico:", error);
        document.getElementById("grafico-clientes").innerHTML = "<p class='text-danger'>Error al cargar gráfico</p>";
    }
}