function GameObject(x,y,w,h,color)
{
    //set up player starting point
    //set up x
    if(x==undefined)
    {
        this.x = canvas.width/2;
    }
    else
    {
        this.x = x;
    }
    //set up y
    if(y==undefined)
    {
        this.y = canvas.height/2;
    }
    else
    {
        this.y = y;
    }

    //set up player dimensions
    if(w==undefined)
    {
        this.width = 100;
    }
    else
    {
        this.width = w;
    }

    if(h==undefined)
    {
        this.height = 100;
    }
    else
    {
        this.height = h;
    }

    //set up player color
    if(color==undefined)
    {
        this.color = "#ff0000";
    }
    else
    {
        this.color = color;
    }

    // //set up bounding box
    // this.left = function()
    // {
    //     return this.x - this.width/2;
    // }
    // this.right = function()
    // {
    //     return this.x + this.width/2;
    // }
    // this.top = function()
    // {
    //     return this.y - this.height/2;
    // }
    // this.bottom = function()
    // {
    //     return this.y + this.height/2;
    // }

    this.left = function()
    {
        return {x: this.x - this.width/2, y: this.y};
    }
    this.right = function()
    {
        return {x: this.x + this.width/2, y: this.y};
    }
    this.top = function()
    {
        return {x: this.x, y: this.y - this.height/2};
    }
    this.bottom = function()
    {
        return {x: this.x, y: this.y + this.height/2};
    }

    this.canJump = false;
    this.prevX = this.x;

    //set up physics
    this.force = 1;
    this.ax = 1;
    this.ay = 1;

    //set up player's velocity
    this.vx = 0;
    this.vy = 0;

    this.destroy = 0;

    this.drawRect = function()
    {
        context.save();
            context.fillStyle = this.color;
            context.translate(this.x,this.y);
            context.fillRect(-this.width/2,-this.height/2,this.width,this.height);
        context.restore();
    }

    this.drawCircle = function()
    {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x,this.y,this.width/2,0,360*Math.PI/180,true)
        context.fill();
        context.closePath();
    }

    this.drawDebug = function()
    {
        var size = 10;
        context.save();
        context.fillStyle = "black";
        context.fillRect(this.x - size/2, this.y - size/2, size, size);
        context.fillRect(this.left().x - size/2, this.left().y - size/2, size, size);
        context.fillRect(this.right().x - size/2, this.right().y - size/2, size, size);
        context.fillRect(this.top().x - size/2, this.top().y - size/2, size, size);
        context.fillRect(this.bottom().x - size/2, this.bottom().y - size/2, size, size);
        context.restore();
    }

    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;
    }

    this.collisionCheck = function(obj)
    {
        if (
            this.left().x < obj.right().x &&
            this.right().x > obj.left().x &&
            this.top().y < obj.bottom().y &&
            this.bottom().y > obj.top().y
            )
        {
            return true;
        }
        return false;
    }

    this.hitTestPoint = function(obj)
{
    if(obj.x >= this.left().x && obj.x <= this.right().x && obj.y >= this.top().y && obj.y <= this.bottom().y)
    {
        return true;
    }
    return false;
}

}

