window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if (!window.indexedDB) {
    console.log("이 브라우저는 안되요!");
}
let request = indexedDB.open("MyTestDatabase",1),db,tx,store,index;
request.onupgradeneeded = function(e) {
    let db = request.result,
    store = db.createObjectStore("QuestionsStore", {
        keyPath: "qID"}),
    // store = db.createObjectStore("QuestionsStore", {
    //     autoIncrement:true});
    index = store.createIndex("questionText", "questionText", {unique: false});
}
request.onerror = function(e) {
    console.log("IndexDB사용을 막으셧네요."+e.target.errorCode);
  };
request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction("QuestionsStore", "readwrite");
    store = tx.objectStore("QuestionsStore");
    index = store.index("questionText");

    db.onerror = function(e) {
        console.log("Error"+e.target.errorCode);
    }
    //store.put({qID: 1, questionText: "The sky is blue",correctAnswer:true, studentAnswer:true, result:true});
    //store.put({qID: 2, questionText: "The grass is grass",correctAnswer:true, studentAnswer:true, result:true});
    let q1 = store.get(1);
    let qs = index.get("The grass is green");
    q1.onsuccess = function() {
        console.log(q1.result);
        console.log(q1.result.questionText);
    }
    qs.onsuccess = function() {
        console.log(qs.result.questionText);
    }
    tx.oncomplete = function(){
        db.close();
    }
}