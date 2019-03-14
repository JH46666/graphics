class Wave{
    constructor({
        canvasWidth, //轴长
        canvasHeight,   //轴高
        waveWidth=0.055, //波浪的宽度， 书越小越宽 B
        waveHeight = 6,//设置波浪的高度 A
        speed = 0.04,
        xOffset =0,
        colors = ['#F39C6B', '#A05638']
    }){
        this.point = [],
        this.startX = 0;
        this.colors = colors;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.waveHeight = waveHeight;
        this.waveWidth = waveWidth;
        this.speed = speed;
        this.xOffset = xOffset
    }

    getChartColor(ctx){
        const radius = this.canvasWidth /2 ;
        const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
        grd.addColorStop(0, this.colors[0]);
        grd.addColorStop(1, this.colors[1]);
        return grd
    }
    //进行波浪内部的绘制
    draw(ctx){
        ctx.save();
        const points = this.points;
        ctx .beginPath();
        for(let i = 0; i < points.length; i++){
            //point  = {x: , y:}
            const point = points[i];
            ctx.lineTo(point[0], point[1])
        }
        ctx.lineTo(this.canvasWidth, this.canvasHeight);
        ctx.lineTo(this.startX, this.canvasHeight);
        ctx.lineTo(points[0][0], points[0][1])
        ctx.fillStyle = this.getChartColor(ctx);
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.restore()
    }
    //更新当前的波浪
    update({ nowrRange } = {}){
        this.points = [];
        const {
            startX,
            canvasWidth,
            canvasHeight,
            waveWidth,
            waveHeight,
            speed,
            xOffset
        } = this;
        //nowrRange == D
        for (let x = startX; x < startX + canvasWidth + xOffset; x += 20/ canvasWidth ){
             //y  =A sin(Bx + c) + D
             //y = 波浪高度 * SIN(x *波浪的宽高 + 水平的位移) + d
            const y = waveHeight * Math.sin((startX + x) * waveWidth + xOffset );
            const dY = canvasHeight * (1 - (nowrRange / 100));
            this.points.push([x, y+ dY])

        }


    }




}