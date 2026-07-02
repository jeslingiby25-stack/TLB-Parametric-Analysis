class TLB:
    def __init__(self, size):
        self.size = size
        self.entries = []
        self.hits = 0
        self.misses = 0

    def access_page(self, page_number):
        # Check if page exists in TLB
        if page_number in self.entries:
            self.hits += 1
            # LRU: Move to end
            self.entries.remove(page_number)
            self.entries.append(page_number)
        else:
            self.misses += 1
            if len(self.entries) >= self.size:
                self.entries.pop(0)  # Remove oldest
            self.entries.append(page_number)

    def get_hit_rate(self):
        total = self.hits + self.misses
        return self.hits / total if total != 0 else 0