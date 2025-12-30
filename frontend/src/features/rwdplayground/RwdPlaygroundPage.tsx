import { Button, Container, Grid } from "@mui/material";
import PageContent from "../shared/components/PageContent";

function RWDPlaygroundPage(): JSX.Element {
  return (
    <PageContent title="RWD Playground">
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button fullWidth variant="contained">
              RWD Playground Button
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button fullWidth variant="contained">
              RWD Playground Button
            </Button>
          </Grid>
          <Grid size="grow">
            <Button fullWidth variant="contained">
              RWD Playground Button
            </Button>
          </Grid>
        </Grid>
      </Container>
    </PageContent>
  );
}

export default RWDPlaygroundPage;
