import { type V2_MetaFunction } from "@remix-run/node";
import Login from "./login";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Login/>
    </>
  );
}
