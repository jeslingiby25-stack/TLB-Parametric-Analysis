let hitChart;
let ematChart;

function runSimulation() {

    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");
    const resultCard = document.getElementById("resultCard");
    const graphSection = document.getElementById("graphSection");

    loader.style.display = "block";
    resultCard.style.display = "none";
    graphSection.style.display = "none";

    const data = {
        tlb_size: document.getElementById("tlb_size").value,
        num_references: document.getElementById("num_references").value,
        tlb_time: document.getElementById("tlb_time").value,
        memory_time: document.getElementById("memory_time").value
    };

    fetch("http://127.0.0.1:5000/simulate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    .then(response => response.json())

    .then(result => {

        loader.style.display = "none";
        resultCard.style.display = "block";
        graphSection.style.display = "block";

        resultDiv.innerHTML = `
            <h3>Simulation Result</h3>
            <p><b>Hit Rate:</b> ${result.hit_rate}</p>
            <p><b>Miss Rate:</b> ${result.miss_rate}</p>
            <p><b>EMAT:</b> ${result.emat}</p>
            <p style="color:green"><b>Optimal TLB Size:</b> ${result.optimal_size}</p>
        `;

        if (hitChart) hitChart.destroy();
        if (ematChart) ematChart.destroy();

        // Generate simulated hit rates from sizes
        let hitRates = result.sizes.map(size => {
            return (size / Math.max(...result.sizes)) * result.hit_rate;
        });

        // GRAPH 1: Hit Rate vs TLB Size
        hitChart = new Chart(document.getElementById("hitChart"), {
            type: "line",
            data: {
                labels: result.sizes,
                datasets: [{
                    label: "Hit Rate vs TLB Size",
                    data: hitRates,
                    borderColor: "#00ffcc",
                    backgroundColor: "rgba(0,255,204,0.2)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "TLB Size"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Hit Rate"
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // GRAPH 2: EMAT vs TLB Size
        ematChart = new Chart(document.getElementById("ematChart"), {
            type: "line",
            data: {
                labels: result.sizes,
                datasets: [{
                    label: "EMAT vs TLB Size",
                    data: result.emat_values,
                    borderColor: "#ffcc00",
                    backgroundColor: "rgba(255,204,0,0.2)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "TLB Size"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "EMAT"
                        }
                    }
                }
            }
        });

    })

    .catch(error => {

        loader.style.display = "none";

        resultDiv.innerHTML = "Error connecting to backend";

        console.error(error);
    });
}