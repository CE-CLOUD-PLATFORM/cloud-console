import { Suspense, type PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <Toaster />
      {children}
    </Suspense>
  );
}
