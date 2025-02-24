import TodoPage from "./pages/TodoPage";

const App = () => {
  return (
    <div className="relative w-screen h-screen">
      <TodoPage />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-5">
        <span>Created by @AsyncDev</span>
      </div>
    </div>
  );
};

export default App;
