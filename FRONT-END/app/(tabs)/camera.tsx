import React, { useEffect, useState } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
  ViroARTrackingTargets,
  Viro3DObject,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import { TouchableOpacity, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import {
  postEvaluationResponse,
  postExercises,
  postUpdateProgress,
  predictEvaluation,
  putResolveExercise,
} from "../../service/api";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GlobalProvider, useGlobalContext } from "../../context/figures";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

let apples = 0;

// Registrar el target de reconocimiento de imagen
ViroARTrackingTargets.createTargets({
  HiroExample: {
    source: require("../../assets/images/hiro.png"), // Ruta a la imagen
    orientation: "Up",
    physicalWidth: 0.1, // ancho real en metros
  },
});

function FloatingApple({ position }) {
  const [newPosition, setPosition] = useState(position);
  const maxDistance = 10; // Define la distancia máxima permitida

  useEffect(() => {
    // Verifica si el objeto se aleja demasiado y lo reubica si es necesario
    const distanceFromOrigin = Math.sqrt(
      newPosition[0] ** 2 + newPosition[1] ** 2 + newPosition[2] ** 2
    );
    if (distanceFromOrigin > maxDistance) {
      setPosition([0, 0, 0]); // Reubica a una posición visible
    }
  }, [newPosition]);

  const handleDrag = (newPositionDrag) => {
    // Mantén el valor de z constante (bloqueando el eje z)
    setPosition([newPositionDrag[0], newPositionDrag[1], position[2]]);
  };

  return (
    <Viro3DObject
      source={require("../../assets/models/apple/scene.gltf")}
      resources={[
        require("../../assets/models/apple/textures/Material_35_baseColor.png"),
      ]}
      type="GLTF"
      position={newPosition}
      scale={[0.001, 0.001, 0.001]}
      onDrag={handleDrag}
    />
  );
}

// Componente de escena básica
function SceneBasic() {
  const { apples } = useGlobalContext();
  const [apples3DComponents, setApples3DComponent] = useState([]);

  useEffect(() => {
    setApples3DComponent([]);
    for (let i = 0; i < apples; i++) {
      setApples3DComponent((prev) => [
        ...prev,
        <FloatingApple key={i} position={[0, 0, -0.5]} />,
      ]);
    }
  }, [apples]);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      {apples3DComponents}
    </ViroARScene>
  );
}

// Componente principal de la aplicación
export default function App() {
  const { apples, setApples, addApples, removeApples } = useGlobalContext();
  const [numbers, setNumbers] = useState(null);
  const [level, setLevel] = useState(0);
  const [operation, setOperation] = useState("suma");
  const [id, setId] = useState(0);
  const [message, setMessage] = useState(null);
  const [exercise, setExercise] = useState();
  const [lastResolved, setLastResolved] = useState(false);
  const [idUser, setIdUser] = useState(1);
  const [loadEvaluation, setLoadEvaluation] = useState(false);

  async function sendResponse() {
    setLoadEvaluation(true);
    if (id) {
      const response = await postEvaluationResponse(id, apples);
      console.log(response);
      setMessage(response.message);
      const resolved = response.resolved;
      setLoadEvaluation(false);

      if (resolved) {
        setLastResolved(true);
        const updateExercise = await putResolveExercise(id);
        const prediction = await predictEvaluation(idUser);
        const responseProgress = await postUpdateProgress(idUser, level);
        console.log(updateExercise);
        console.log(responseProgress);
        console.log(prediction);

        // if () {
        //   const predict = await predictEvaluation(idUser);
        //   const newPredict = predict.predict;
        //   console.log("Prediccion", newPredict);
        // }
      }
    }
    setLoadEvaluation(false);
  }

  function generateExercise() {
    postExercises(1).then((response) => {
      const numbers = response.numbers;
      const level = response.level;
      const operation = response.operation;
      const id = response.id;

      setNumbers(numbers);
      setLevel(level);
      setOperation(operation);
      setId(id);
      setExercise(response);
    });
  }

  useEffect(() => {
    generateExercise();
  }, []);

  function operatorString() {
    if (operation === "suma") return "+";
    if (operation === "resta") return "-";
    if (operation === null) return "";
  }

  useEffect(() => {
    if (lastResolved) {
      setTimeout(() => {
        setLastResolved(false);
      }, 5000);
    }
  }, [lastResolved]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, [message]);

  function States() {
    if (numbers === null) {
      return "Cargando ...";
    }
    if (loadEvaluation) {
      return "Evaluando ...";
    } else {
      return `${numbers[0]} ${operatorString()} ${numbers[1]}`;
    }
  }

  return (
    <View className="flex-1 relative">
      <ViroARSceneNavigator initialScene={{ scene: SceneBasic }} />
      <View className="absolute top-0 w-full flex-row justify-between mt-12 p-4">
        <View className="p-2 bg-green-500 rounded-xl flex-1 ml-4 justify-center items-center">
          <Text className="text-center text-white">Nivel {level}</Text>
        </View>
        <View className="p-2 bg-green-500 rounded-xl flex-1 ml-4 justify-center">
          <Text className="text-center text-white">{States()}</Text>
        </View>
        <View className="p-2 bg-green-500 rounded-xl flex-1 ml-4 items-center flex-row justify-center">
          <Text className="text-center text-white">{operation}</Text>
        </View>
      </View>

      <View className="absolute bottom-0 w-full h-screen items-center justify-center p-4">
        <View
          className={"bg-red-400 rounded-xl p-2"}
          style={{ display: message ? "flex" : "none" }}
        >
          <Text className="text-white text-center text-lg">{message}</Text>
          <TouchableOpacity
            className="w-full p-2 bg-green-500 rounded-xl"
            style={{ display: lastResolved ? "flex" : "none" }}
            onPress={() => {
              setMessage(null);
              setLastResolved(false);
              setApples(0);
              generateExercise();
            }}
          >
            <Text className="text-white uppercase">Siguiente nivel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-0 w-full items-center pb-6 flex-row justify-center p-3">
        <TouchableOpacity
          className="bg-red-500/60 rounded-full p-2"
          onPress={removeApples}
        >
          <MaterialIcons name="delete" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white/60 rounded-full p-2 ml-5 mr-5"
          onPress={sendResponse}
        >
          <Feather name="box" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500/60 rounded-full p-2"
          onPress={addApples}
        >
          <Entypo name="plus" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
