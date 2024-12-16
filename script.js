let capitalChart, interestChart; // Variables globales para los gráficos

document.getElementById('interestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores de los campos
    const capital = parseFloat(document.getElementById('capital').value);
    const tasaInteres = parseFloat(document.getElementById('interes').value) / 100;
    const años = parseInt(document.getElementById('años').value);
    const vecesCompuesto = 1; // Cambia esto si deseas compounding más frecuente

    // Inicializar arrays para los datos de los gráficos
    const capitalData = [];
    const interestData = [];
    let totalCapital = capital;

    // Calcular el capital y el interés acumulado para cada año
    for (let i = 0; i <= años; i++) {
        if (i > 0) {
            totalCapital = capital * Math.pow((1 + tasaInteres / vecesCompuesto), (vecesCompuesto * i)); // Cálculo del capital total
        }
        const interesAcumulado = totalCapital - capital; // Calcular el interés acumulado
        interestData.push((interesAcumulado / capital) * 100); // Interés como porcentaje del capital inicial
        capitalData.push(totalCapital); // Agregar el capital total al array
    }

    // Actualizar los gráficos
    updateCapitalChart(capitalData);
    updateInterestChart(interestData);

    // Mostrar el total en el DOM
    document.getElementById('totalCapital').textContent = totalCapital.toFixed(2);
    document.getElementById('totalInteres').textContent = (totalCapital - capital).toFixed(2) ; // Mostrar el interés total
});

// Función para actualizar el gráfico de capital
function updateCapitalChart(data) {
    const ctx = document.getElementById('capitalChart').getContext('2d');
    if (capitalChart) {
        // Si el gráfico ya existe, actualiza los datos
        capitalChart.data.datasets[0].data = data;
        capitalChart.data.labels = Array.from({ length: data.length }, (_, i) => i); // Actualiza las etiquetas
        capitalChart.update(); // Actualiza el gráfico
    } else {
        // Si no existe, crea un nuevo gráfico
        capitalChart = new Chart(ctx, {
            type: 'line', // Tipo de gráfico
            data: {
                labels: Array.from({ length: data.length }, (_, i) => i), // Etiquetas de los años
                datasets: [{
                    label: 'Total Capital ($)',
                    data: data,
                    borderColor: 'rgb(0, 255, 170)',
                    backgroundColor: 'rgba(0, 255, 170, 0.2)',
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Función para actualizar el gráfico de interés
function updateInterestChart(data) {
    const ctx = document.getElementById('interestChart').getContext('2d');
    if (interestChart) {
        // Si el gráfico ya existe, actualiza los datos
        interestChart.data.datasets[0].data = data;
        interestChart.data.labels = Array.from({ length: data.length }, (_, i) => i); // Actualiza las etiquetas
        interestChart.update(); // Actualiza el gráfico
    } else {
        // Si no existe, crea un nuevo gráfico
        interestChart = new Chart(ctx, {
            type: 'line', // Tipo de gráfico
            data: {
                labels: Array.from({ length: data.length }, (_, i) => i), // Etiquetas de los años
                datasets: [{
                    label: 'Interés Acumulado (%)',
                    data: data,
                    borderColor: 'rgb(0, 162, 255)',
                    backgroundColor: 'rgba(0, 162, 255, 0.2)',
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value ; // Formatear el eje Y como porcentaje
                            }
                        }
                    }
                }
            }
        });
    }
}


// Función para alternar entre modo claro y oscuro
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Cambiar el icono según el tema
    const icon = document.getElementById('icon');
    if (body.classList.contains('dark-mode')) {
        icon.src = 'icono-sol.png'; // Icono para modo oscuro
    } else {
        icon.src = 'icono-luna.png'; // Icono para modo claro
    }
});