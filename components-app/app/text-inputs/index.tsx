import ThemedCard from "@/components/shared/ThemedCard";
import ThemedTextInput from "@/components/shared/ThemedTextInput";
import ThemedView from "@/components/shared/ThemedView";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import ThemedText from "../../components/shared/ThemedText";
const isIOS = Platform.OS === "ios";
const TextInputsScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ThemedView margin>
          <ThemedCard className="mb-5 flex flex-col">
            <ThemedTextInput
              className=" w-full"
              placeholder="Name..."
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="words"
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <ThemedTextInput
              className=" w-full"
              placeholder="Email..."
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <ThemedTextInput
              className=" w-full"
              placeholder="Phone..."
              keyboardType="phone-pad"
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
          </ThemedCard>

          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>
          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>
          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>
          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>
          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>
          <ThemedCard className="my-2">
            <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
          </ThemedCard>

          <ThemedTextInput
            className=" w-full"
            placeholder="Email..."
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
        </ThemedView>
        <View style={{ marginBottom: 80 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default TextInputsScreen;
