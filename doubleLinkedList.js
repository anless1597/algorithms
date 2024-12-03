'use strict'
export function DoubleNode(value) {
    this.value = value; 
    this.next = undefined;
    this.previous = undefined;
}

export class DoubleLinkedList {
    constructor(value) {
        const node = new DoubleNode(value);
        this._head = node;
        this._tail = node;
        this._length = 1;
    }

    static fromArray(...values) {
        const result = new DoubleLinkedList(values[0]);

        for(let i = 1; i < values.length; i++) {
            result.push(values[i]);
        }

        return result;
    }

    push(value) {
        const node = new DoubleNode(value);
        this._tail.next = node;
        node.previous = this._tail;
        this._tail = node;
        this._length++;
    }

    unshift(value) {
        const node = new DoubleNode(value);
        node.next = this._head;
        this._head.previous = node; 
        this._head = node;
        this._length++;
    }

    pop() {
        if(this.isEmpty()) return
   
        const result = this._tail;

        if(this._head === this._tail) {
            this._length = 0;
            this._head = undefined;
            this._tail = undefined;
            return result;
        }

        this._tail = result.previous;
        this._tail.next = undefined;
        result.previous = undefined;
        this._length--;

        return result;
    }

    shift() {
        if(this.isEmpty()) return

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

        while(current) {
            if(current.value === value) {
                if(current.previous) {
                    current.previous.next = current.next;
                }
                current.previous = undefined;
                current.next = undefined;
                this._length--;
                return current;
            } else {
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