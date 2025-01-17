import React from 'react';
import { Header } from './components/Header';
import { ProjectEditor } from './components/ProjectEditor';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ProjectEditor />
      </main>
    </div>
  );
}

export default App;