import { useState, type SubmitEventHandler } from "react";

type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

const generateId = (text: string) =>
  `todo-${encodeURI(text)}-${Math.floor(Math.random() * 1000)}`;

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const content = data.get("todo")?.toString();

    if (!content) return;

    setTodos((prev) => [
      ...prev,
      {
        content,
        completed: false,
        id: generateId(content),
      },
    ]);

    e.currentTarget.reset();
  };

  const completeTodo = (id: string) => {
    setTodos((prev) => {
      return prev.map((item) => {
        if (item.id == id) return { ...item, completed: !item.completed };
        return item;
      });
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id != id));
  };

  return (
    <main className="bg-[#111111] flex flex-col w-screen h-screen gap-10 py-42 text-amber-50 font-serif text-2xl">
      <header className="flex justify-center gap-4 items-center text-4xl font-bold">
        <img src="/favicon.svg" alt="Our logo" className="w-8 h-8" />
        <h1>Better todos</h1>
      </header>
      <form className="w-full flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          className="outline-4 w-3/4 h-10 outline-blue-500 focus:outline-blue-400 rounded-lg p-4"
        />
      </form>
      <ul className="flex flex-col items-center gap-2">
        {todos.map(({ id, completed, content }) => (
          <li
            key={id}
            className={`flex gap-4 border-2 w-1/2 justify-between items-center ${completed ? "border-red-500 hover:border-red-400" : "border-green-500 hover:border-green-400"} rounded-xl px-4 py-2`}
          >
            <input
              className="w-8 h-8 rounded-xl accent-blue-600 hover:accent-blue-500"
              type="checkbox"
              onChange={() => completeTodo(id)}
            ></input>
            <span className={`${completed ? "line-through" : ""}`}>
              {content}
            </span>
            <button
              className="text-red-700 hover:text-red-600 hover:cursor-pointer"
              type="button"
              onClick={() => deleteTodo(id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
