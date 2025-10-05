import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ProtectedRoute";
import { GlobalChatProvider } from "./GlobalChatProvider";
const queryClient = new QueryClient();

function App() {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    queryClient.setQueryData(["user"], JSON.parse(savedUser));
  }

  return (
    <GlobalChatProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </GlobalChatProvider>
  );
}

export default App;
