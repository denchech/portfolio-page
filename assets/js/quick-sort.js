class QuickSort {
    #length;
    #min;
    #max;
    #comparator;
    #array = [];
    #median = undefined;

    constructor(length, {
        min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, comparator = (x, y) => x < y
    }) {
        this.#length = length;
        this.#min = min;
        this.#max = max;
        this.#comparator = comparator;
    }

    get array() {
        return this.#array;
    }

    get median() {
        return this.#median;
    }

    generate() {
        this.#array = Array.from({length: this.#length}, () => {
            return this.#min + Math.floor(Math.random() * (this.#max - this.#min + 1));
        });
    }

    sort() {
        this._quickSort(0, this.#array.length - 1);

        if (this.#array.length % 2 === 1) {
            this.#median = this.#array[Math.floor(this.#array.length / 2)];
        } else {
            this.#median = 0.5 * (this.#array[Math.floor(this.#array.length / 2) - 1] + this.#array[Math.floor(this.#array.length / 2)]);
        }
    }

    minValue() {
        if (this.#array.length === 0) {
            return undefined;
        }

        let minValue = Number.MAX_SAFE_INTEGER;

        this.#array.forEach((el) => {
            if (el < minValue) {
                minValue = el;
            }
        })

        return minValue;
    }

    maxValue() {
        if (this.#array.length === 0) {
            return undefined;
        }

        let maxValue = Number.MIN_SAFE_INTEGER;

        this.#array.forEach((el) => {
            if (el > maxValue) {
                maxValue = el;
            }
        })

        return maxValue;
    }

    _quickSort(left, right) {
        let index;

        if (this.#array.length > 1) {
            index = this._partition(left, right);

            if (left < index - 1) {
                this._quickSort(left, index - 1);
            }

            if (index < right) {
                this._quickSort(index, right);
            }
        }
    }

    _partition(left, right) {
        let pivot = this.#array[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        while (i <= j) {

            while (this.#comparator(this.#array[i], pivot)) {
                i++;
            }

            while (this.#comparator(pivot, this.#array[j])) {
                j--;
            }

            if (i <= j) {
                let temp = this.#array[j];
                this.#array[j] = this.#array[i];
                this.#array[i] = temp

                i++;
                j--;
            }
        }

        return i;
    }
}

x = new QuickSort(5, {min: 5, max: 20, comparator: (x, y) => x < y});

x.generate();
console.log(x.array);

x.sort();
console.log(x.array);

console.log(x.minValue());
console.log(x.maxValue());
console.log(x.median);
