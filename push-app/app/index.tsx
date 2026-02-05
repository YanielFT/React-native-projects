import { ThemedText } from "@/components/themed-text";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import React from "react";
import { FlatList, View } from "react-native";

const PushApp = () => {
  const { notification, sendPushNotification, expoPushToken } =
    usePushNotifications();
  return (
    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
      {/* <ThemedText>Token:{expoPushToken}</ThemedText> */}
      <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
        Title: {notification?.[notification.length]?.request.content.title}
      </ThemedText>
      <FlatList
        data={notification}
        keyExtractor={(item) => item.request.identifier}
        renderItem={({ item }) => {
          return (
            <View>
              <ThemedText style={{ fontWeight: "bold" }}>
                {item.request.content.title}
              </ThemedText>
              <ThemedText>{item.request.content.body}</ThemedText>
              <ThemedText>
                {JSON.stringify(item.request.content.body, null, 2)}
              </ThemedText>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: "lightgray", opacity: 0.3 }}
          />
        )}
      />
    </View>
  );
};

export default PushApp;
