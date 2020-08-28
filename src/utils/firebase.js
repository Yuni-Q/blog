import * as firebase from 'firebase';
let database;
let config = {
	apiKey: 'AIzaSyDlYM9tmiCS8cpJNCJDt1ayilldy4ZHcqA',
	authDomain: 'yuni-q.firebaseapp.com',
	databaseURL: 'https://yuni-q.firebaseio.com',
	projectId: 'yuni-q',
	storageBucket: 'yuni-q.appspot.com',
	messagingSenderId: '158413688649',
	appId: '1:158413688649:web:a15e7e4e8ff8894f049498',
	measurementId: 'G-J4THPFQ6L1',
};

export const fire = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	}
	database = firebase.database();
};

export const getFireDB = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	}
	database = firebase.database();
	return database.ref('/').child('memo');
};

export const updateFireDB = memos => {
	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	}
	database = firebase.database();
	return database
		.ref('/')
		.child('memo')
		.set(memos);
};
