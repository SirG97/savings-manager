import { useState } from "react";
import CustomersList from "./CustomersList";

import AppLayout from "../../components/layout/AppLayout";

export default function Customers() {
  return (
    <AppLayout>
      <CustomersList />
    </AppLayout>
  );
}
