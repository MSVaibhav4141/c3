class Shape{
    constructor(shape, color){
        this.shape = shape;
        this.color = color;
    }
    getShape(){
        console.log("The shape of it is", this.shape)
    }
    getColor(){
        if(!this.color)throw new Error('color is undefined')
        console.log("Color of the", this.shape , "is", this.color)
    }
}
class Rect extends Shape{
    constructor(length, breath,color){
        super("Reactangle", color)
        this.length = length;
        this.breath = breath;
    }

    getArea(){
        console.log("Area of rectangle is ", this.length * this.breath)
    }
}
class Circle extends Shape{
    constructor(rad,color){
        super("Circle", color)
        this.rad = rad;
    }

    getArea(){
        console.log("Area of rectangle is ", Math.pow(this.rad, 2) * Math.PI )
    }
}

const circle = new Circle(5, 'blue')
circle.getArea();
circle.getColor()


//Some more classes
const date = new Date()
console.log(date.toISOString())

const maps = new Map()
maps.set('riya', {g:'female', age:21})
maps.set('vms', {g:'male', age:22})

console.log(maps.get('vms'))