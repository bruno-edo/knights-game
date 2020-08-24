const Knight = class {
    constructor(id) {
        this.id = id;
        this.hp = 100;
    }

    takeDamage(damage) {
        this.hp -= damage;

        if (this.hp < 0) {
            this.hp = 0;
        }
    }
}

const DoublyLinkedNode = class {
    constructor(data, previous = null, next = null) {
        this.previous = previous;
        this.next = next;
        this.data = data;
        this.length = 0;
    }
}


const DoublyLinkedLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addNewTailNode(data) {
        const newNode = new DoublyLinkedNode(data);

        if (this.tail) {
            newNode.next = this.head;
            newNode.previous = this.tail;

            this.tail.next = newNode;
            this.head.previous = newNode;

            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        }

        this.length += 1;
    }

    removeNode(node) {
        if (this.length > 2) {
            const previous = node.previous;
            const next = node.next;

            node.previous.next = next;
            node.next.previous = previous;

            this.length -= 1;
        } else if (this.length === 2) {
            this.head = node.next;
            this.tail = node.previous;
            this.length -= 1;
        } else if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
    }
}

const damageRoll = () => Math.floor(Math.random() * 6 + 1);

const linkedList = new DoublyLinkedLinkedList();
const numKnights = 5;

for (let i = 0; i < numKnights; i++) {
    const knight = new Knight(i + 1)
    linkedList.addNewTailNode(knight);
}

let current = linkedList.head;

const scramblePos = Math.floor(Math.random() * numKnights);

for (let i = 0; i < scramblePos; i++) {
    current = current.next;
}

while(linkedList.length > 1) {
    const target = current.next.data;

    const damage = damageRoll();

    console.log(`Knight ${current.data.id} attacks knight ${target.id} for ${damage} damage.`);

    target.takeDamage(damage)
    

    if (target.hp === 0) {
        console.log(`Knight ${target.id} dies!`)
        linkedList.removeNode(current.next);
    } else {
        const targetDamage = damageRoll();
        current.data.takeDamage(targetDamage);
        console.log(`Knight ${target.id} punches back knight ${current.data.id} for ${targetDamage} damage.`);

        if (current.data.hp === 0) {
            console.log(`Knight ${current.data.id} also dies!`);
            linkedList.removeNode(current);
        }
    }

    current = current.next;
}

console.log(`Knight ${linkedList.head.data.id} wins!`);

