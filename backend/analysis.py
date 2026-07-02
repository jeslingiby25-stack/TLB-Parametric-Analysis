import random
from tlb import TLB

def run_simulation(tlb_size, num_references, tlb_time, memory_time):

    tlb = TLB(tlb_size)

    # Generate random page references
    pages = [random.randint(0, 50) for _ in range(num_references)]

    for page in pages:
        tlb.access_page(page)

    hit_rate = tlb.get_hit_rate()
    miss_rate = 1 - hit_rate

    emat = (hit_rate * (tlb_time + memory_time)) + \
           (miss_rate * (tlb_time + 2 * memory_time))

    return {
        "hit_rate": round(hit_rate, 3),
        "miss_rate": round(miss_rate, 3),
        "emat": round(emat, 3)
    }