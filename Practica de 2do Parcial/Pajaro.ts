namespace Animal
{
    export class Pajaro extends Mascotas
    {
        private tipo:eTipo;
        public id:number;
        constructor(nombre:string,tipo:eTipo)
        {
            super(nombre);
            this.tipo = tipo;
        }
    }
}