import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "././components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottumMenu/TabBottomMenu";

// const TODO_LIST = [
//   { id: 1, title: "Sortir le chien", isCompleted: true },
//   { id: 2, title: "Aller chez le garagiste", isCompleted: false },
//   { id: 3, title: "Faire les courses", isCompleted: true },
//   { id: 4, title: "Appeler le vétérinaire", isCompleted: true },
// { id: 5, title: "Sortir le chien", isCompleted: true },
// { id: 6, title: "Aller chez le garagiste", isCompleted: false },
// { id: 7, title: "Faire les courses", isCompleted: true },
// { id: 8, title: "Appeler le vétérinaire", isCompleted: true },
// ];

export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Sortir le chien", isCompleted: true },
    { id: 2, title: "Aller chez le garagiste", isCompleted: false },
    { id: 3, title: "Faire les courses", isCompleted: true },
    { id: 4, title: "Appeler le vétérinaire", isCompleted: true },
    { id: 5, title: "Sortir le chien", isCompleted: true },
    { id: 6, title: "Aller chez le garagiste", isCompleted: false },
    { id: 7, title: "Faire les courses", isCompleted: true },
    { id: 8, title: "Appeler le vétérinaire", isCompleted: true },
  ]);

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    );

    //copie du tableau vu que c est un state on peut pas le modifier directement
    const updatedTodoList = [...todoList];

    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
    // console.log(indexToUpdate);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
    </>
  );
}
