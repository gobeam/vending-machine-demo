import VendingMachine from "containers/VendingMachine/Loadable";

export const publicRoutes = [
  {
    key: "vending-machine",
    name: "VendingMachine",
    path: "/",
    component: VendingMachine,
    exact: true,
  },
];
