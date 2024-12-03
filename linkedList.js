'use strict'
export function Node(value) {
    this.value = value; 
    this.next = undefined;
}

export class LinkedList {
    constructor(value) {
        const node = new Node(value);
        this._head = node;
        this._tail = node;
        this._length = 1;
    }

    static fromArray(...values) {
        const result = new LinkedList(values[0]);

        for(let i = 1; i < values.length; i++) {
            result.push(values[i]);
        }

        return result;
    }

    push(value) {
        const node = new Node(value);
        this._tail.next = node;
        this._tail = node;
        this._length++;
    }

    unshift(value) {
        const node = new Node(value);
        node.next = this._head;
        this._head = node;
        this._length++;
    }

    pop() {
        if(this.isEmpty()) return;

        const result = this._tail;

        if(this._head === this._tail) {
            this._length = 0;
            this._head = undefined;
            this._tail = undefined;
            return result;
        }

        let current = this._head;

        while(current.next !== result) {
            current = current.next;
        }

        this._tail = current;
        this._tail.next = undefined;
        this._length--;

        return result;
    }

    shift() {
        if(this.isEmpty()) return;

        const result = this._head;

        if(this._head === this._tail) {
            this._length = 0;
            this._head = undefined;
            this._tail = undefined;
            return result;
        }

        this._head = result.next;
        result.next = undefined;
        this._length--;
        
        return result;
    }

    get length() {
        return this._length;
    }

    toString() {
        const result = [];

        for(let current = this._head; current; current = current.next) {
            result.push(current.value);
        }

        return result.join(', ');
    }

    isEmpty() {
        return this._length === 0;
    }

    *[Symbol.iterator] () {
        let current = this._head;

        while(current) {
            yield current.value;
            current = current.next;
        }
    }

    delete(value) {
        let current = this._head;
        let previous = undefined;

        while(current) {
            if(current.value === value) {
                if(previous) {
                    previous.next = current.next;
                }
                current.next = undefined;
                this._length--;
                return current;
            } else {
                previous = current;
                current = current.next;
            }
        }

        return undefined;
    }

    contains(value) {
        let current = this._head;

        while(current) {
            if(current.value === value) {
                return true;
            } else {
                current = current.next;
            }
        }

        return false;
    }

    get values() {
        const result = [];
        
        for(const elem of this) {
            result.push(elem);
        }

        return result;
    }
}