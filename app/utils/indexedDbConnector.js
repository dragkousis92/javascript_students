class IndexedDbConnector {

	constructor(dbName, eventReady, ...arrayNames) {
		this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

		this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

		if (!window.indexedDB) {
			window.alert("Your browser doesn't support a stable version of IndexedDB.")
		}

		var request = window.indexedDB.open(dbName, 1.1);
		let element = this;

		request.onupgradeneeded = function (event) {

			var db = event.target.result;

			arrayNames.forEach(arrayName => {
				if (!db.objectStoreNames.contains(arrayName)) {
					db.createObjectStore(arrayName, { autoIncrement: true });
				}
			});

			element._database = db;
			console.log("success: " + this._database);
		};

		request.onerror = function (event) {
			alert('could not start indexedDb');
			console.error("Database error: " + event.target.errorCode);
			document.dispatchEvent(new CustomEvent("IndexedDbReady", {}));


		};

		request.onsuccess = function (event) {
			element._database = request.result;

			console.log("success: " + this._database);
			document.dispatchEvent(new CustomEvent("IndexedDbReady", {}));

		};

	};

	add(object, arrayName) {
		var request = this._database.transaction([arrayName], 'readwrite')
			.objectStore(arrayName)
			.add(object);

		request.onsuccess = function (event) {
			console.log(object.toString() + ' has been written successfully');
		};

		request.onerror = function (event) {
			console.log('The data has been written failed');
		}
	}

	read(objectId, arrayName) {
		var transaction = this._database.transaction([arrayName]);
		var objectStore = transaction.objectStore(arrayName);
		var request = objectStore.get(objectId);

		request.onerror = function (event) {
			console.log('Transaction failed');
		};

		request.onsuccess = function (event) {
			if (request.result) {
				return request.result;
			} else {
				console.log('No data record');
			}
		};
	}

	readAll(arrayName) {
		var result = [];
		var objectStore = this._database.transaction([arrayName]).objectStore(arrayName);

		objectStore.openCursor().onsuccess = function (event) {
			var cursor = event.target.result;

			if (cursor) {
				result.push(cursor.value);
				// console.log(cursor.value);

				cursor.continue();
			} else {
				console.log('No more data');
				document.dispatchEvent(new CustomEvent("IndexedDbReadAll", {
					detail: { result }
				}));
			}
		};
	}

	update(object, arrayName) {
		var request = this.db.transaction([arrayName], 'readwrite')
			.objectStore(arrayName)
			.put(object);

		request.onsuccess = function (event) {
			return true;
		};

		request.onerror = function (event) {
			return false;
		}
	}

	remove(objectId, arrayName) {
		var request = this.db.transaction([arrayName], 'readwrite')
			.objectStore(arrayName)
			.delete(objectId);

		request.onsuccess = function (event) {
			return true;
		};

		request.onerror = function (event) {
			return false;
		}
	}
}


export default IndexedDbConnector;