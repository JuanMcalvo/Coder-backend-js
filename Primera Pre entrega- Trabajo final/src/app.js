import express from 'express';
import productRouter from './Router/productRouter.js';

const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter);


app.listen(port, () => {
    console.log(`escuchando en el puerto ${port}`)
})