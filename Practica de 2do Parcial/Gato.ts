namespace Animal
{
    export class Gato extends Mascotas
    {
        private cantVidas:number = 9;
        public id:number;

        constructor(nombre:string,cantVidas:number)
        {
            super(nombre);
            this.cantVidas = cantVidas;
        }

        public getCantVidas()
    {
        return this.cantVidas;
    }
    
        public setCantVidas(cantVidas:number)
        {
            this.cantVidas = cantVidas;
        }
    }

    
}
