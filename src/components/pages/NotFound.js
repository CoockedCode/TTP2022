import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClientList = () => {

  //navigeermine
  const navigate = useNavigate();

  return (
    <>
      <main>
        <section>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    }}>
                        <h1 style={{ margin: 0, padding: 0 }}>404 - Seda lehte pole olemas!</h1>
                        <Button type="submit" variant="outlined" size="large" sx={{ px: 2.2, py: 1.2, mt: 3, mb: 2, bgcolor: "main" }} onClick={() => navigate("/main")}>
                            <h4 style={{ margin: 0, padding: 0 }}>Tagasi avalehele</h4>
                        </Button>
                </Box>
            </Container>
        </section>
      </main>
    </>
  );
};

export default ClientList;