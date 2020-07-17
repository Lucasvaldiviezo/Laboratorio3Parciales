namespace Animal
{
    export class Perro extends Mascotas
    {
        public raza:string;
        public id:number;
        constructor(nombre:string,raza:string)
        {
            super(nombre);
            this.raza = raza;
        }

        public getNombre():string
        {
            return this.nombre;
        }

        public setNombre(nombre:string)
        {
            this.nombre = nombre;
        }
    }
}