import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { ReactCsspin } from "react-csspin";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<ReactCsspin />}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
