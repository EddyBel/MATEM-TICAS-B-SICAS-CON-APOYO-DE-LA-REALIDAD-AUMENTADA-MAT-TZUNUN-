import axios from "axios";
// const API_URL = "http://192.168.88.238:5000/api";
const API_URL = "http://192.168.137.21:8000/api";

export function createUser(user) {
  const response = axios.post(`${API_URL}/user`, user);
  if (response.status !== 200) throw new Error("Failed to create user");
  const data = response.data;
  return data;
}

export function getUser(id) {
  const response = axios.get(`${API_URL}/user/${id}`);
  if (response.status !== 200) throw new Error("Failed to fetch user");
  const data = response.data;
  return data;
}

export async function postExercises(id) {
  const response = await axios.post(`${API_URL}/exercises/1`);
  if (response.status !== 200) console.log("Faild to generate exercise");
  const data = await response.data;
  if (data) {
    return data.data;
  }
}

export async function predictEvaluation(id_user) {
  const response = await axios.get(`/evaluation/prediction/${id_user}`);

  if (response.status !== 200) console.log("Error en la evaluacion");
  const data = await response.data;

  if (data) {
    return data.data;
  }
}

export async function postEvaluationResponse(numExercise, result) {
  const response = await axios.post(
    `${API_URL}/evaluation_exercise/${numExercise}`,
    {
      result: result,
    }
  );

  if (response.status !== 200) console.log("Error en la evaluacion");
  const data = await response.data;

  if (data) {
    return data.data;
  }
}

export async function putResolveExercise(id_exercises) {
  const response = await axios.put(
    `${API_URL}/exercises_resolved/${id_exercises}`
  );

  if (response !== 200) console.log("Error en la resolucion");

  const data = await response.data;

  if (data) {
    return data.data;
  }
}

export async function postUpdateProgress(id_user, predict) {
  const response = await axios.post(`${API_URL}/progress/${id_user}`, {
    predict: predict,
  });

  if (response.status !== 200)
    console.log("Error al actualizar el progreso del usuario");

  const data = response.data;
  if (data) {
    return data;
  }
}
