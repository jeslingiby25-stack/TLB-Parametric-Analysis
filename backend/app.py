
from flask import Flask, request, jsonify
from flask_cors import CORS
from analysis import run_simulation
from optimizer import find_optimal_tlb_size

app = Flask(__name__)
CORS(app)


@app.route("/simulate", methods=["POST"])
def simulate():

    data = request.json

    tlb_size = int(data["tlb_size"])
    num_references = int(data["num_references"])
    tlb_time = int(data["tlb_time"])
    memory_time = int(data["memory_time"])

    result = run_simulation(tlb_size, num_references, tlb_time, memory_time)

    optimal = find_optimal_tlb_size(num_references, tlb_time, memory_time)

    return jsonify({
        "hit_rate": result["hit_rate"],
        "miss_rate": result["miss_rate"],
        "emat": result["emat"],

        "optimal_size": optimal["optimal_size"],
        "optimal_emat": optimal["optimal_emat"],

        "sizes": optimal["sizes"],
        "emat_values": optimal["emat_values"]
    })


if __name__ == "__main__":
    app.run(debug=True)