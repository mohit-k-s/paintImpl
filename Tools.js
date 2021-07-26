/**
 * Contains various tools that will be used in the paint app
 * each tool has a set of operations that only they can do 
 */

// canvas and the context are available here too so no need to grab them



class Point{
    constructor(x, y){
        this.x = x; this.y = y;
    }
}

/**
 * A lineTool just makes lines from one point to another
 * user clicks on one point it remembers this point and then when clicked again it just makes the line
 */

class LineTool{

    p1 = null
    p2  = null

    firstPoint(point){
        ctx.beginPath()
        console.log('first point is', point)
        ctx.moveTo(point.x, point.y)
        this.p1 = point
    }

    makeLine(point){
        this.p2 = point

        if(this.p1 && point) {
            ctx.lineTo(this.p2.x, this.p2.y)
            ctx.stroke()
        }
    }
}

/**
 * Brush tool works differently when the user has clicked on it it continues to track the mouse movement 
 * and continues making the lines also the brush tool, but at low level it just works the same as the lineTool 
 */

class BrushTool extends LineTool{
    makeLine(point){
        this.p2 = point
        if(this.p1 && point) ctx.lineTo(this.p2.x, this.p2.y)
        ctx.stroke()
        // just change p1 to p2
        this.p1 = this.p2
    }
}

class PaintBucket{
    
}