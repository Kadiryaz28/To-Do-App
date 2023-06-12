import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";
import React, { useState } from "react";

/**
 * Hauptkomponente der App.
 */
export default function App() {
  // Zustandsvariablen für die Aufgaben und das aktuelle ToDo
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  /**
   * Funktion zum Hinzufügen einer Aufgabe.
   */
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  /**
   * Funktion zum Markieren einer Aufgabe als erledigt.
   * @param {number} index - Der Index der zu erledigenden Aufgabe.
   */
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Statusleiste */}
      <StatusBar style="auto" />

      {/* To-Dos */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To-Dos</Text>
        <View styles={styles.items}>
          {/* Liste der To-Dos */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Eingabefeld für neue Aufgaben */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Neues ToDo"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D3D3",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 200,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    backgroundColor: "#FFF",
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  addText: {},
});
