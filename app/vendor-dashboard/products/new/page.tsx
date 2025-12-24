import { Suspense } from "react";
import NewProductClient from "./NewProductClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewProductClient />
    </Suspense>
  );
}
