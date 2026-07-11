import { Button, message } from "antd";
import { useState } from "react";
import { WorkbenchPage, WorkbenchPanel, WorkbenchPasswordSignInDrawer } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
export function CredentialDrawerRoute() { const text = useExampleText(); const [open, setOpen] = useState(false); return <WorkbenchPage description={text.components.credentialDrawerDescription} title={text.components.credentialDrawer}><WorkbenchPanel><Button onClick={() => setOpen(true)}>{text.components.openCredentialDrawer}</Button></WorkbenchPanel><WorkbenchPasswordSignInDrawer open={open} onClose={() => setOpen(false)} onSubmit={(values) => { void message.success(text.components.credentialSubmitted("login", values.username)); setOpen(false); }} /></WorkbenchPage>; }
