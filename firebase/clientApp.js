// import 'firebase/messaging'
// import firebase from 'firebase';
// import 'firebase/auth';

// export const initializeFirebase = () => {
//   if (!firebase.apps.length) {
// 	  firebase.initializeApp({
// 		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// 		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// 		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// 		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// 		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// 		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// 		})
//   }
// };

// export const firebaseNotification = async () => {
// 	try {
// 		const messaging = firebase.messaging()
// 		await messaging.requestPermission()
// 		  .then(() => {
// 			return messaging.getToken()
// 		}).then((token) => {
// 			console.log('Token', token)
// 		})
// 	} catch (error) {
// 		console.log(error)
// 	}
// }


import firebase from 'firebase';

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		});
  }
  // use other service worker
  // navigator.serviceWorker
  //   .register('/my-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging()


    await messaging.requestPermission();
    const token = await messaging.getToken();

    return token;
  } catch (error) {
    console.error(error);
  }
}
