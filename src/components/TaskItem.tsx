import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { EditTaskArgs } from "../pages/Home";
import { Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
// import { Container } from './styles';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export default function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TaskItemProps): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = React.useRef<TextInput>(null);

  function handleStarEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSaveEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskTitle });
    setIsEditing(false);
  }

  //use effect to monitoring is editing.
  React.useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {/* <Text
            //TODO - use style prop
            style={task.done ? styles.taskTextDone : styles.taskText}
          >
            {task.title}
          </Text> */}
          <TextInput
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
            editable={isEditing}
            onSubmitEditing={handleSaveEditing}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            //TODO - use onPress (remove task) prop
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            //TODO - use onPress (remove task) prop
            onPress={handleStarEditing}
          >
            <Icon name="edit-3" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        )}
        <View style={styles.incosDivider} />
        <TouchableOpacity
          style={{ paddingHorizontal: 24 }}
          disabled={isEditing}
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },

  incosDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
