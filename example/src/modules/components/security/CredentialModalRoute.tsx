import { Button, message } from "antd";
import { useState } from "react";
import { WorkbenchPage, WorkbenchPanel, WorkbenchPasswordSignInModal } from "@lwmacct/260627-antd-workbench";
import { useExampleText } from "../../../shared/i18n";
export function CredentialModalRoute() { const text = useExampleText(); const [open, setOpen] = useState(false); return <WorkbenchPage description={text.components.credentialModalDescription} title={text.components.credentialModal}><WorkbenchPanel><Button onClick={() => setOpen(true)}>{text.components.openCredentialModal}</Button></WorkbenchPanel><WorkbenchPasswordSignInModal open={open} onCancel={() => setOpen(false)} onSubmit={(values) => { void message.success(text.components.credentialSubmitted("login", values.username)); setOpen(false); }} /></WorkbenchPage>; }
