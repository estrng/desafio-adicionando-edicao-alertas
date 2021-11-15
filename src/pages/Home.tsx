import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: Math.random().toString(),
      title: newTaskTitle,
      done: false,
    };

    const foundTask = tasks.find(
      (task) => task.title.toUpperCase() === newTask.title.toUpperCase()
    );

    if (foundTask)
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
    else setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const taskToUpdade = tasks.map((task) => ({ ...task }));

    const taskIndex = taskToUpdade.find((task) => task.id === id);

    if (taskIndex) {
      taskIndex.done = !taskIndex.done;
      setTasks(taskToUpdade);
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover task",
      "Você tem certeza que deseja remover esta task?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask({ taskId = 0, taskNewTitle = "" }) {
    //get the task by id and update the title.
    const taskToUpdate = tasks.map((task) => ({ ...task }));

    const taskIndex = taskToUpdate.find((task) => task.id === taskId);

    if (taskIndex) {
      taskIndex.title = taskNewTitle;
      setTasks(taskToUpdate);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
