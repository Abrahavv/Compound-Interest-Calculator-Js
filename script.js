let capitalChart, interestChart; // Variables globales para los gráficos

document.getElementById('interestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores de los campos
    const capital = parseFloat(document.getElementById('capital').value);
    const tasaInteres = parseFloat(document.getElementById('interes').value) / 100;
    const años = parseInt(document.getElementById('años').value);
    const vecesCompuesto = 1; // Capitalización anual

    // Inicializar arrays para los datos de los gráficos y la tabla
    const capitalData = [capital]; // Iniciar con el capital inicial
    const interestData = [0]; // Iniciar con interés 0
    const tableData = [];
    let totalCapital = capital;

    // Calcular el capital, interés y datos de la tabla para cada período
    for (let i = 0; i <= años; i++) {
        // Balance inicial del período
        const initialBalance = i === 0 ? capital : capitalData[i - 1];

        // Cálculo del capital total con interés compuesto
        totalCapital = capital * Math.pow((1 + tasaInteres / vecesCompuesto), (vecesCompuesto * i));

        // Interés acumulado total (diferencia entre capital actual y capital inicial)
        const interesAcumulado = totalCapital - capital;

        // Ganancias totales como porcentaje
        const totalGainsPercent = (interesAcumulado / capital) * 100;

        // Guardar datos para gráficos
        if (i > 0) {
            capitalData.push(totalCapital);
            interestData.push(totalGainsPercent);
        }

        // Guardar datos para la tabla
        tableData.push({
            period: i,
            initialBalance: initialBalance,
            finalBalance: totalCapital,
            totalProfit: interesAcumulado,
            totalGainsPercent: totalGainsPercent
        });
    }

    // Actualizar los gráficos
    updateCapitalChart(capitalData);
    updateInterestChart(interestData);

    // Mostrar el total en el DOM
    document.getElementById('totalCapital').textContent = totalCapital.toFixed(2);
    document.getElementById('totalInteres').textContent = ((totalCapital - capital) / capital * 100).toFixed(2);

    // Renderizar la tabla
    renderTable(tableData);
});

// Función para actualizar el gráfico de capital
function updateCapitalChart(data) {
    const ctx = document.getElementById('capitalChart').getContext('2d');
    if (capitalChart) {
        capitalChart.data.datasets[0].data = data;
        capitalChart.data.labels = Array.from({ length: data.length }, (_, i) => i);
        capitalChart.update();
    } else {
        capitalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: data.length }, (_, i) => i),
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
                        beginAtZero: true,
                        title: { display: true, text: 'Monto ($)' }
                    },
                    x: { title: { display: true, text: 'Períodos' } }
                }
            }
        });
    }
}

// Función para actualizar el gráfico de interés
function updateInterestChart(data) {
    const ctx = document.getElementById('interestChart').getContext('2d');
    if (interestChart) {
        interestChart.data.datasets[0].data = data;
        interestChart.data.labels = Array.from({ length: data.length }, (_, i) => i);
        interestChart.update();
    } else {
        interestChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: data.length }, (_, i) => i),
                datasets: [{
                    label: 'Ganancias Totales (%)',
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
                        title: { display: true, text: 'Ganancias (%)' },
                        ticks: {
                            callback: function(value) {
                                return value + '%'; // Mostrar como porcentaje
                            }
                        }
                    },
                    x: { title: { display: true, text: 'Períodos' } }
                }
            }
        });
    }
}

// Función para renderizar la tabla
function renderTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' });
    const percentFormatter = new Intl.NumberFormat('es-ES', { style: 'percent', minimumFractionDigits: 2 });
    tableContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Períodos</th>
                    <th>Balance Inicial</th>
                    <th>Balance Final</th>
                    <th>Beneficio Total</th>
                    <th>Ganancias Totales</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(row => `
                    <tr>
                        <td>${row.period}</td>
                        <td>${formatter.format(row.initialBalance)}</td>
                        <td>${formatter.format(row.finalBalance)}</td>
                        <td>${formatter.format(row.totalProfit)}</td>
                        <td>${percentFormatter.format(row.totalGainsPercent / 100)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
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