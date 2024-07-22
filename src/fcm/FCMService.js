import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRegisterStore } from '../store/RegisterStore'
class FCMService {
    // componentDidMount() {
    //     const {tokenDevice} = useRegisterStore();
    //     console.log("noigidi",AsyncStorage.getItem("tokenn"))
    //     this.getToken(AsyncStorage.getItem("tokenn"))
    //   }
    // đăng ký sự kiện và callback cho FCM. để xử lý các sự kiện đăng ký, nhận thông báo và mở thông báo.
    register = (onRegister, onNotification, onOpenNotification) => {
        // kiểm tra quyền truy cập thông báo của ứng dụng.
        this.checkPermission(onRegister)
        //Phương thức này tạo các sự kiện lắng nghe thông báo từ Firebase Messaging.
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }
    // bật tính năng tự động khởi tạo của Firebase Messaging trên iOS.
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            //await messaging().registerDeviceForRemoteMessages(); 
            await messaging().setAutoInitEnabled(true);
        }

    }
    // kiểm tra quyền truy cập thông báo của ứng dụng.
    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                //Nếu quyền đã được cấp, phương thức gọi getToken để lấy token của thiết bị.
                if (enabled) {
                    this.getToken(onRegister);
                    //Nếu quyền chưa được cấp, phương thức gọi requestPermission để yêu cầu cấp quyền.
                } else {
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                console.log("[FCMService] Permission reject ", error);
            })
    }
    // Phương thức này được sử dụng để lấy token của thiết bị từ Firebase Messaging.
    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    AsyncStorage.setItem("tokenn", fcmToken)
                    console.log("fcmTOKEN", fcmToken)
                    //phương thức gọi onRegister với token như một tham số.
                    // onRegister(fcmToken);
                    console.log("[FCMService] Token firebase", fcmToken);
                } else {
                    console.log("[FCMService] User does not have a device token");
                }

            }).catch(error => {
                console.log("[FCMService] getToken reject ", error);
            })
    }
    //Phương thức này được sử dụng để yêu cầu cấp quyền truy cập thông báo của ứng dụng.
    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                // Khi quyền được cấp, phương thức gọi getToken để lấy token của thiết bị.
                this.getToken(onRegister);
            }).catch(error => {
                console.log("[FCMService] Permission reject ", error);
            })
    }
    //Phương thức này được sử dụng để xóa token của thiết bị từ Firebase Messaging.
    deleteToken = () => {
        console.log("[FCMService deleteToken]");
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete token erro");
            })
    }
    //Phương thức này tạo các sự kiện lắng nghe thông báo từ Firebase Messaging.
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        //when the application is running, but in the background
        //Sự kiện onNotificationOpenedApp được gọi khi ứng dụng đang chạy ở background và nhận thông báo.
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                console.log("[FCMService] onNotificationOpenedApp Notification App chay background", remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    onOpenNotification(notification);
                }
            });

        //when the application is opened from a quit state
        //Sự kiện getInitialNotification được gọi khi ứng dụng được khởi động từ trạng thái đã thoát.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] getInitialNotification App da thoat", remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    onOpenNotification(notification);
                }
            });

        //Foreground state messages
        //Sự kiện onMessage được gọi khi ứng dụng đang chạy và nhận thông báo.
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] when have new notify!", remoteMessage);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.notification;
                } else {
                    notification = remoteMessage.notification;
                }
                onNotification(notification);


            }
        });

        //Triggered when have new token
        //sự kiện onTokenRefresh được kích hoạt, nghĩa là token của thiết bị đã thay đổi, bạn có thể sử dụng phương thức onRegister (được truyền vào khi gọi phương thức register) để xử lý việc cập nhật token mới.
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMService] new token refresh: ", fcmToken);
            // onRegister(fcmToken);
        });
    }
    //Phương thức này được sử dụng để hủy đăng ký lắng nghe sự kiện từ Firebase Messaging.
    unRegister = () => {
        this.messageListener();
    }

}

export const fcmService = new FCMService();