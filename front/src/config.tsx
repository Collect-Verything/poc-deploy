import React, {useState} from "react";
import {Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography,} from "@mui/material";

export type SiteConfig = {
    storeName: string;
    email: string;
    password: string;
    primaryColor: string;
};

type Field = {
    label: string;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    value: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
};


export default function SimpleSiteConfigForm() {
    const [storeName, setStoreName] = useState("Ma Boutique");
    const [email, setEmail] = useState("contact@example.com");
    const [primaryColor, setPrimaryColor] = useState("#0ea5e9");
    const [password, setPassword] = useState("password");
    const [preview, setPreview] = useState<SiteConfig | null>(null);
    const[displayWebsite, setDisplayWebsite] = useState(false);


    const fields: Field[] = [
        {label: "Nom de la boutique", type: "text", value: storeName, setter: setStoreName},
        {label: "Email de contact", type: "email", value: email, setter: setEmail},
        {label: "Mot de passe", type: "text", value: password, setter: setPassword},
        {label: "Couleur principale", type: "color", value: primaryColor, setter: setPrimaryColor},
    ];

    function buildPayload(): SiteConfig {
        return {
            storeName,
            email,
            password,
            primaryColor,
        };
    }
    const API = process.env.REACT_APP_API_BASE!;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPreview(buildPayload());
        fetch(`${API}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(preview),
        }).catch(console.error);
        setDisplayWebsite(true);
    }

    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#f8fafc", py: 6, px: 2}}>
            <Box sx={{mx: "auto"}}>
                <Typography variant="h5" color="black" fontWeight={700} gutterBottom>
                    Configuration de votre site
                </Typography>

                <Card>
                    <CardHeader title="Informations"/>
                    <CardContent>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>

                                <Grid container spacing={2}>
                                    {fields.map(({label, type, value, setter}, idx) => (
                                        <Grid  key={idx}>
                                            <TextField
                                                fullWidth
                                                type={type}
                                                label={label}
                                                value={value}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value)}
                                                required={type !== "color"}
                                                // InputLabelProps={type === "color" ? {shrink: true} : undefined}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid>
                                    <Stack direction="row" justifyContent="flex-end">
                                        <Button variant="contained" type="submit">
                                            Générer ma boutique
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>

                {displayWebsite &&
                    <Card sx={{mt: 3}}>
                        <CardHeader title="Consulter votre boutique"/>
                        <CardContent>
                            <Grid>
                                <Stack direction="row" justifyContent="center">
                                    <Button variant="contained" type="submit"  component="a"
                                            href={`http://adresseip`}
                                            target="_blank">
                                        Consulter votre boutique
                                    </Button>
                                </Stack>
                            </Grid>
                        </CardContent>
                    </Card>
                   }

                {preview && (
                    <Card sx={{mt: 3}}>
                        <CardHeader title="Payload généré"/>
                        <CardContent>
                            <Box component="pre" sx={{p: 2, bgcolor: "#0f172a", color: "#e2e8f0", borderRadius: 2, overflowX: "auto"}}>
                                {JSON.stringify(preview, null, 2)}
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>
    );
}
