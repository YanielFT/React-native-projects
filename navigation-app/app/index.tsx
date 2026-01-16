import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/user" />;

  // return (
  //   <SafeAreaView>
  //     <View className="mt-6 mx-5">
  //       <Text className="text-3xl text-secondary-200  font-work-black">
  //         Hola mundo
  //       </Text>
  //       <Text className="text-2xl text-primary font-work-medium">
  //         Hola mundo
  //       </Text>
  //       <Text className="text-xl text-secondary-100 font-work-light">
  //         Hola mundo
  //       </Text>
  //       <Text className="text-xl text-tertiary">Hola mundo</Text>

  //       <Link href="/products">Productos</Link>
  //     </View>
  //   </SafeAreaView>
  // );
}
