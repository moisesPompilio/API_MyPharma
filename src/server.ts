import { app } from "./app";

const PORT = process.env.PORT;
console.log(process.env.DATABASE_URL)

app.listen(PORT, () => console.log(`API is running on PORT ${PORT}`));
