/*
	May be worth rewriting in future to optionally store data per node.
	But isn't worth it right now.
*/
class Graph {
	constructor() {
		this.nodes = new Map();
	}

	ensureNode(nodeName) {
		if (!this.nodes.has(nodeName)) {
			const newNode = new Node(nodeName);
			this.nodes.set(nodeName, newNode);
		}

		return this.nodes.get(nodeName);
	}

	/*
		Could likely be made more efficient since it is iterating every time.
		Nothing happens if a node or edge is present already.
	*/
	addNodesByInEdges(nodeName, inEdgesArray) {
		const currentNode = this.ensureNode(nodeName);

		for (const inNodeName of inEdgesArray) {
			const inNode = this.ensureNode(inNodeName);
			currentNode.addInEdge(inNode);
		}
	}

	addParentNode(nodeName, parentName) {
		const currentNode = this.ensureNode(nodeName);
		const parentNode = this.ensureNode(parentName);
		parentNode.addOutEdge(currentNode);
	}

	kahnsTopSort() {
		const sortedQueue = [];

		if (this.nodes.size > 0) {
			const degreeMap = new Map();
			const queue = [];

			// Maps the starting nodes and places them at the end of the queue to sort.
			for (const node of this.nodes.values()) {
				const degree = node.inDegree;

				degreeMap.set(node.name, degree);

				if (degree === 0) {
					queue.push(node);
				}
			}

			/*
				Moves first node in queue to sorted queue as it has no in edges.
				Then iterates over the nodes out edges and lowers their degree by 1.
				If it is 0 the edge node has no other in edges and can be added to queue for next iteration.

				Shifting from the queue each time prevents infinite loops even with circular dependencies.
			*/
			while (queue.length > 0) {
				const currentNode = queue.shift();
				sortedQueue.push(currentNode.name);

				for (const outNode of currentNode.outEdges) {
					const newDegree = degreeMap.get(outNode.name) - 1;
					degreeMap.set(outNode.name, newDegree);

					if (newDegree === 0) {
						queue.push(outNode);
					}
				}
			}

			if (sortedQueue.length !== degreeMap.size) {
				const endSet = new Set(sortedQueue);
				const circularDependencies = [];

				for (const [nodeName] of degreeMap) {
					if (!endSet.has(nodeName)) {
						circularDependencies.push(nodeName);
					}
				}

				throw new Error(`[ERROR] Circular dependency found within ${circularDependencies.join(', ')}!`);
			}
		}

		return sortedQueue;
	}
}

/*
	I originally wrote methods to remove nodes / edges but took them out.
	Creating a new graph is better than guessing how to handle adjacent node edges.
*/
class Node {
	constructor(name) {
		this.name = name;
		this.inEdges = new Set();
		this.outEdges = new Set();
	}

	get inDegree() {
		return this.inEdges.size;
	}

	get outDegree() {
		return this.outEdges.size;
	}

	/*
		Checking if it is already added isn't necessary.
		Sets already limit to unique entries.
	*/
	addInEdge(node) {
		this.inEdges.add(node);
		node.outEdges.add(this);
	}

	addOutEdge(node) {
		this.outEdges.add(node);
		node.inEdges.add(this);
	}
}

module.exports = {
	Graph
};