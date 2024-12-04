'use strict'
export function bubbleSort(arr) {
    if (!Array.isArray(arr)) throw new TypeError();

    if (arr.length === 0 || arr.length === 1) return arr;

    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

export function insertionSort(arr) {
    if (!Array.isArray(arr)) throw new TypeError();

    if (arr.length === 0 || arr.length === 1) return arr;

    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (arr[j] < arr[j - 1]) {
            const temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            j--;
        }
    }

    return arr;
}

export function selectionSort(arr) {
    if (!Array.isArray(arr)) throw new TypeError();

    if (arr.length === 0 || arr.length === 1) return arr;

    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) min = j;
        }

        const temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }

    return arr;
}

export function mergeSort(arr) {
    if (!Array.isArray(arr)) throw new TypeError();

    if (arr.length === 0 || arr.length === 1) return arr;

    const leftPart = mergeSort(arr.slice(0, arr.length / 2));
    const rightPart = mergeSort(arr.slice(arr.length / 2, arr.length));
    const result = [];

    while (leftPart.length > 0 && rightPart.length > 0) {
        if (leftPart[0] < rightPart[0]) {
            result.push(leftPart.shift());
        } else {
            result.push(rightPart.shift());
        }
    }

    result.push(...leftPart, ...rightPart);

    return result;
}

export function quickSort(arr) {
    function subsort(start, end) {
        if(start < end) {
            const pivot = partition(start, end);
            subsort(start, pivot);
            subsort(pivot+1, end);
        }
    }

    function partition(start, end) {
        const pivot = arr[Math.floor((start+end)/2)];
        let i = start, j = end;

        while (true) {
            while(arr[i] < pivot) i++;
            while(arr[j] > pivot) j--;
            if(i>=j) return j; 

            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            i++;
            j--;
        }
    }

    if (!Array.isArray(arr)) throw new TypeError();

    if (arr.length === 0 || arr.length === 1) return arr;

    const pivot = partition(0, arr.length -1);
    subsort(0, pivot);
    subsort(pivot+1, arr.length -1);

    return arr;
}