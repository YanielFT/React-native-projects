import ThemedButton from "@/components/shared/ThemedButton";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { Link, router } from "expo-router";
import { StyleSheet, View } from "react-native";

const ModalScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <View className="mx-8">
        <Link className="text-center" asChild href="/modal/modal-example">
          <ThemedText type="link" className="text-3xl">
            Abrir Modal
          </ThemedText>
        </Link>

        <ThemedButton
          className="m-4"
          onPress={() => router.push("/modal/modal-example")}
        >
          Abrir Modal
        </ThemedButton>

        <ThemedText>
          lirum ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo
        </ThemedText>
      </View>
    </ThemedView>
  );
};
export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
    zIndex: 9999,
  },
});
