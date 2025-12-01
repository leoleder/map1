// Cargar la librería de Google Charts
google.charts.load('current', {
    'packages':['geochart'],
});

// Callback cuando la API está lista
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    // DATOS REALES CENSO 2024 (INE)
    // El formato es: [Código ISO, Nombre Visible, Población]
    var data = google.visualization.arrayToDataTable([
        ['Código', 'Departamento', 'Población'],
        ['BO-S', 'Santa Cruz', 3115386],
        ['BO-L', 'La Paz', 3022566],
        ['BO-C', 'Cochabamba', 2005373],
        ['BO-P', 'Potosí', 856419],
        ['BO-H', 'Chuquisaca', 600132],
        ['BO-O', 'Oruro', 570194],
        ['BO-T', 'Tarija', 534309],
        ['BO-B', 'Beni', 477441],
        ['BO-N', 'Pando', 130761]
    ]);

    var options = {
        region: 'BO', 
        resolution: 'provinces', 
        // Paleta de colores profesional: azul claro a azul corporativo oscuro
        colorAxis: {colors: ['#bfdbfe', '#1e40af']}, 
        backgroundColor: 'transparent', // Fondo transparente para integrar con el CSS
        datalessRegionColor: '#f1f5f9',
        defaultColor: '#f1f5f9',
        legend: 'none', // Sin leyenda automática, usamos la tarjeta personalizada
        tooltip: {
            textStyle: {color: '#1e293b', fontName: 'Poppins'},
            showColorCode: false
        }
    };

    // Crear el gráfico en el div correspondiente
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    // ESCUCHAR CLICS
    google.visualization.events.addListener(chart, 'select', function() {
        var selection = chart.getSelection();
        
        if (selection.length > 0) {
            var row = selection[0].row;
            
            // 1. Obtener datos
            var nombre = data.getValue(row, 1);
            var poblacion = data.getValue(row, 2);

            // 2. Formatear números (ej: 3.115.386)
            var poblacionFormateada = new Intl.NumberFormat('es-BO').format(poblacion);

            // 3. Actualizar el DOM (HTML) con animación simple
            var titulo = document.getElementById('dept-name');
            var numero = document.getElementById('dept-pop');

            // Pequeño efecto de "fade" visual
            titulo.style.opacity = 0;
            numero.style.opacity = 0;

            setTimeout(() => {
                titulo.innerText = nombre;
                numero.innerText = poblacionFormateada;
                
                titulo.style.opacity = 1;
                numero.style.opacity = 1;
            }, 200);
        }
    });
}

// Hacer el mapa responsive si se cambia el tamaño de la ventana
window.addEventListener('resize', function() {
    drawRegionsMap();
});