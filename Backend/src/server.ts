import 'dotenv/config'
import app from './app.ts'
import { connectToDb } from './config/db.ts';

connectToDb()

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
