from analysis import run_simulation

def find_optimal_tlb_size(num_references, tlb_time, memory_time):

    sizes = []
    emat_values = []

    best_size = None
    best_emat = float('inf')

    # Test different TLB sizes
    for size in range(2, 65, 2):

        result = run_simulation(size, num_references, tlb_time, memory_time)

        emat = result["emat"]

        sizes.append(size)
        emat_values.append(emat)

        if emat < best_emat:
            best_emat = emat
            best_size = size

    return {
        "optimal_size": best_size,
        "optimal_emat": best_emat,
        "sizes": sizes,
        "emat_values": emat_values
    }