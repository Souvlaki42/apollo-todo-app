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

  return (
    <main className="bg-[#111111] flex flex-col w-screen h-screen gap-10 py-42 text-amber-50 font-serif text-2xl">
      <header className="flex justify-center text-4xl font-bold">
        <h1>Todo app for Apollo</h1>
      </header>
      <section>
        <form className="w-full flex justify-center">
          <input
            type="text"
            name="todo-add"
            className="outline-4 w-3/4 h-10 outline-blue-500 hover:outline-blue-400 rounded-lg p-4"
          />
        </form>
      </section>
    </main>
  );
}
