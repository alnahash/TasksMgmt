// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const signInBtn = document.getElementById('sign-in-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const taskList = document.getElementById('tasks');
const addTaskBtn = document.getElementById('add-task-btn');

// Sign-in with Google
signInBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

// Sign-out
signOutBtn.onclick = () => auth.signOut();

// Manage authentication state
auth.onAuthStateChanged(user => {
  if (user) {
    signInBtn.style.display = 'none';
    signOutBtn.style.display = 'block';
    loadTasks();
  } else {
    signInBtn.style.display = 'block';
    signOutBtn.style.display = 'none';
    taskList.innerHTML = '';
  }
});

// Add new task
addTaskBtn.onclick = async () => {
  const taskName = document.getElementById('task-name').value;
  const taskDate = document.getElementById('task-date').value;

  if (taskName && taskDate) {
    await db.collection('tasks').add({
      name: taskName,
      date: taskDate,
      uid: auth.currentUser.uid,
    });
    loadTasks();
  }
};

// Load tasks
async function loadTasks() {
  taskList.innerHTML = '';
