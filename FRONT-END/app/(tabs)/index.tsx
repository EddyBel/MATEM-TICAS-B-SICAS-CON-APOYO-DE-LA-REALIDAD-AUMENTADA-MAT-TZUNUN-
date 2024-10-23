import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { useEffect, useRef } from "react";
export default function HomeScreen() {
  const router = useExpoRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // valor inicial de opacidad 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in a 1
      duration: 500, // Duración de 1 segundo
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-black">
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="h-[85vh] w-full bg-orange-300 items-center justify-center rounded-br-[80px] rounded-bl-[80px] relative pb-5"
      >
        <View className="w-full px-11 py-2 absolute top-12 left-0 right-0">
          <View className="w-full flex-row justify-center">
            <View className="w-full h-1 bg-black/20 rounded-full"></View>
          </View>
        </View>

        <Text className="text-2xl font-bold max-w-[280px] text-center mb-3">
          <Text className="text-red-500">Eduardo</Text>, listo para un día más
          de aprendizaje
        </Text>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../../assets/images/happy-face.png")}
        />

        <View className="mt-3">
          <Text className="text-sm text-black/70 text-center uppercase">
            Ejercicios de la semana
          </Text>
          <Text className="text-sm text-black/70 text-center uppercase">
            10 / 40
          </Text>
          <Text className="text-center text-black font-bold text-xl uppercase">
            Feliz
          </Text>
        </View>

        <View className="w-4/5 bg-neutral-900 rounded-3xl absolute bottom-8 px-5 py-2">
          <Text className="text-neutral-200 font-bold uppercase">
            Gran progreso, ¡sigue así!
          </Text>

          <View className="mt-3 mb-2 flex-row justify-between items-center">
            <View className="bg-white w-auto h-auto rounded-lg px-4 py-1 mr-4">
              <Text className="font-bold text-black/80">10 min</Text>
            </View>

            <View className="w-full h-1 bg-neutral-100/80 rounded-full flex-1">
              <View className="bg-green-600 h-1 rounded-full w-3/5"></View>
            </View>
          </View>
        </View>
      </Animated.View>

      <View className="h-[15vh] justify-end px-5 py-4">
        <TouchableOpacity
          onPress={() => router.push("camera")}
          className="w-full rounded-xl bg-green-500 py-3 flex-row items-center justify-center"
        >
          <Text className="text-white uppercase mr-4">Siguiente</Text>
          <AntDesign
            name="doubleright"
            size={24}
            color="white"
            styl={{ opacity: 0.8 }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
