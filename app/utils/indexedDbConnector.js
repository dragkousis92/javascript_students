import studentObject from './studentObject'



let  IndexedDbConnector = function() {
 
	var privateCounter = 0;
	let instance = null,database;


	function init(dbName, eventReady, ...arrayNames){

		return new Promise((resolve, reject) => {

			if (this.instance) {
				resolve(true);
			}
		
			this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

			this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
			this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

			if (!window.indexedDB) {
				window.alert("Your browser doesn't support a stable version of IndexedDB.")
			}

			var request = window.indexedDB.open(dbName, 1);

			request.onupgradeneeded = function (event) {

				var db = event.target.result;
				var objectStore = db.createObjectStore("student", { keyPath: "id" });
				objectStore.transaction.oncomplete = function(event) {

					var studentObjectStore = db.transaction("student", "readwrite").objectStore("student");

					//fill the db with the students
					studentObject.students.forEach(function(customer) {
						studentObjectStore.add(customer);
					});

					database = db;
				};
			};

			request.onerror = function (event) {
				alert('could not start indexedDb');
				resolve(true);
				
			};

			request.onsuccess = function (event) {
				database = request.result;
				resolve(database);
			};

		});
	};
	

	function readAll(arrayName) {
		var result = [];
		var objectStore = database.transaction([arrayName]).objectStore(arrayName);

		return new Promise(
			function(resolve,reject){
				objectStore.openCursor().onsuccess = function (event) {
					var cursor = event.target.result;
		
					if (cursor) {
						result.push(cursor.value);
						cursor.continue();
					} 
					else {
						resolve(result);
					}
				};
			}
		)
	};

	function read(objectId, arrayName) {
		return new Promise( function(resolve, reject) {

			var transaction = database.transaction([arrayName]);
			var objectStore = transaction.objectStore(arrayName);
			var request = objectStore.get(objectId);

			request.onerror = function (event) {
				reject(Error('Transaction failed'));
			};

			request.onsuccess = function (event) {
				if (request.result) {
					resolve(request.result);
				}
				else {
					reject(Error('No data'));
				}
			};
		});
	}

	function update(object, arrayName) {
		return new Promise(
			function(resolve, reject) {
				var request = database.transaction([arrayName], 'readwrite')
					.objectStore(arrayName)
					.put(object);

				request.onsuccess = function (event) {
					resolve(true);
				};

				request.onerror = function (event) {
					resolve(false);
				}
			}
		);
		
	}

   return {
		init: init,
		readAll: readAll,
		update: update,
		read: read
	};

}();


export default IndexedDbConnector;