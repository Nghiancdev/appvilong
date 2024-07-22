import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class LocalNotificationService {
    //Phương thức configure: Được sử dụng để cấu hình các thiết lập cho thông báo cục bộ. Nó nhận một hàm onOpenNotification làm tham số, được gọi khi một thông báo được mở.
    configure = (onOpenNotification) => {
        PushNotification.configure({
             // Định nghĩa sự kiện khi người dùng chọn tắt thông báo đẩy
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister: ",token);
            },
            // Định nghĩa hành động khi nhận thông báo đẩy
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification: ",notification);
                if(!notification?.data){
                    return
                } 
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);
 
                if(Platform.OS === 'ios'){
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);    
                }
            },

            //IOS Only {optional}: default: all - permissions to register
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            //Should the initial notification be poped automatically
            //defaul: true
            popInitialNotification: true,

            requestPermissions: true,
        })
        // Tạo kênh thông báo
        PushNotification.createChannel(
            {
              channelId: "icab", // (required) Định danh duy nhất cho kênh thông báo
              channelName: "icabchannel", // (required) Tên của kênh thông báo
              channelDescription: "Icab notifications", // (optional) default: undefined. Mô tả của kênh thông báo (tùy chọn)
              playSound: true, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function Tùy chọn âm thanh khi nhận thông báo
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true. Có rung khi nhận thông báo hay không
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
    }
    //Phương thức unregister: Được sử dụng để hủy đăng ký thông báo cục bộ.
    unregister = () => {
        PushNotification.unregister();
    }
    //Phương thức showNotification: Được sử dụng để hiển thị thông báo cục bộ. Nhận các tham số như id (định danh thông báo), title (tiêu đề thông báo), message (nội dung thông báo), data (dữ liệu đi kèm), và options (các tùy chọn khác cho thông báo).
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            //Android Only Properties Xây dựng thông báo cho nền tảng Android. Nhận các tham số như id, title, message, data, và options để tạo ra các thuộc tính cho thông báo.
            ...this.buildAndroidNotification(id, title, message, data, options),
            // IOS and Android properties Xây dựng thông báo cho nền tảng iOS. Nhận các tham số tương tự như buildAndroidNotification.
            ...this.buildIOSNotification(id, title, message, data, options),
            // IOS and Android properties
            title: title || "",
            message: message || "",
            playSound: options.playSound || true,
            soundName: options.soundName || 'default',
            userInteraction: false //boolean: if the notification was opened by the user from the notification
        });
    }
    //Phương thức buildAndroidNotification: Xây dựng thông báo cho nền tảng Android. Nhận các tham số như id, title, message, data, và options để tạo ra các thuộc tính cho thông báo.
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            channelId: "icab",
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data,
        }
    }
    //Phương thức buildIOSNotification: Xây dựng thông báo cho nền tảng iOS. Nhận các tham số tương tự như buildAndroidNotification.
    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }
    //Phương thức cancelAllLocalNotifications: Hủy tất cả các thông báo cục bộ đã gửi đi.
    cancelAllLocalNotifications = () => {
        if(Platform.OS === 'ios'){
            PushNotificationIOS.removeAllDeliveredNotifications();
        }else{
            PushNotification.cancelAllLocalNotifications();
        }
    }
    //Phương thức removeDeliveredNotificationByID: Xóa thông báo cục bộ đã được gửi đi dựa trên notificationId được cung cấp.
    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID: ", notificationId);
        PushNotification.cancelLocalNotifications({id: `${notificationId}`});
    }
}

export const localNotificationService = new LocalNotificationService();