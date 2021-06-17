import { assertEquals, assertExists } from "std/testing/asserts.ts";
import { Spy, spy } from "mock/spy.ts";

import "../mocks/globals.ts";
import "../mocks/dom.ts";
import TodoList from "../../static/widgets/todo-list.js";

Deno.test("> TodoList Widget", () => {
  const todoList: TodoList = new TodoList();
  const setAttributeSpy: Spy<TodoList> = spy(todoList, "setAttribute");

  todoList.connectedCallback();
  assertExists(todoList.shadow, "Shadow property not created");
  assertEquals(
    setAttributeSpy.calls.length,
    1,
    "setAttribute called more than once",
  );
  assertEquals(
    setAttributeSpy.calls[0].args,
    ["role", "listbox"],
  );
});
