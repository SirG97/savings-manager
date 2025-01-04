// import { useState } from "react";
import WalletTabs from "./WalletTabs"
// import WalletStats from "./WalletStats";
import WalletTransactions from "./WalletTransactions";

import AppLayout from "../../components/layout/AppLayout";


export default function WalletRecipient() {
  return (
    <AppLayout>
      <WalletTabs />

      <WalletTransactions/>
    </AppLayout>
  );
}
