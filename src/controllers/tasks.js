import { v4 as uuidv4 } from "uuid";


export class tasksController {
  static createTask(task, setter, array) {
    if (task.title === "") return;

    const newTask = {
      id: uuidv4(),
      state: false,
      taskName: task.title,
    };

    const updatedArray = [newTask, ...array];
    setter(updatedArray);
  }

  static updateTask(task, id, setter, array) {
    if (!task || !id) {
      console.log("Invalid Data");
      return;
    }
    const taskIndex = array.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      console.log("Note not Found");
      return;
    }

    const updatedTasks = {
      ...array[taskIndex],
      taskName: task.title,
    };

    const updatedArray = [
      ...array.slice(0, taskIndex),
      updatedTasks,
      ...array.slice(taskIndex + 1),
    ];

    setter(updatedArray);
  }

  static checkTask(
    task,
    setterChecked,
    array,
    taskArray,
    setterTask,
    container,
    setContainer
  ) {
    let completedTask;
    let pendingTask;

    if (container) {
      pendingTask = array.find((item) => item.id === task.id);
    }

    if (pendingTask) {
      pendingTask.state = false;
    } else {
      completedTask = taskArray.find((item) => item.id === task.id);
      completedTask.state = true;
    }

    setTimeout(() => {
      if (completedTask && completedTask.state) {
        const updatedArray = [completedTask, ...array];
        setterChecked(updatedArray, array);
        const filteredTasks = taskArray.filter((item) => item.id !== task.id);
        setterTask(filteredTasks);
      }

      if (pendingTask && !pendingTask.state) {
        const filteredCompletedTasks = array.filter(
          (item) => item.id !== task.id
        );
        setterChecked(filteredCompletedTasks);

        const updatedArray = [pendingTask, ...taskArray];
        setterTask(updatedArray);

        if (filteredCompletedTasks.length < 1) setContainer(false);
      }
    }, 300);
  }
}
