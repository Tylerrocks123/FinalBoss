var canvas;
var context;
var player;
var timer;
var interval = 1000/60;
var jumpcount = 0;

var frictionX = 0.8;
var frictionY = 0.8;
var gravity = 1;
var score = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
context.font = "30px Arial";

player = new GameObject(100,canvas.height/2,100,100,"#eeea1e");
platform0 = new GameObject();
platform0.width = 400;
platform0.y = player.y + player.height/2 + platform0.height/2;
platform0.color = "#66ff33";
platform1 = new GameObject();
platform1.width = 400;
platform1.x = 115;
platform1.y = player.y ;
platform1.color = "#66ff33";
platform2 = new GameObject();
platform2.width = 400;
platform2.x = 910;
platform2.y = player.y ;
platform2.color = "#66ff33";
npc1 = new GameObject(300,canvas.height/2,100,100,"#1eaeff");
npc1.vx = 2;
npc1.active = true;
player.destroy = 30;
npc1.destroy = 30;

context.fillStyle = "red";
context.fillText("EVIL BALL",400,100);
context.fillStyle = "black";
context.fillText("To begin click the screen!",300,200);
context.fillText("w,a,d to move (pressing w twice allows you to double jump)", 100, 550);
context.fillText("Don't touch the enemy while not red hot or you'll lose!", 150, 425);
context.fillText("Kill the enemy to gain while red hot to gain Score!", 200, 300)
context.fillText("Shift to become red hot + heavy, allows you to destroy platforms + enemies", 10, 650);
context.fillText("You can only be red hot + heavy for a limited time before you lose!", 60, 750);

canvas.addEventListener("click", function (e)
{
    timer = setInterval(animate, interval);
}, { once: true });

function animate()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    gravity = 1;

    context.fillStyle = "black";
    context.fillText("Overheat in: " + player.destroy,50,50);
    context.fillText("Score: " + score,800,50);

    if (w && jumpcount < 2)
    {
        player.canJump = false;
        player.vy = player.jumpSpeed;
        jumpcount++;
        w=false;
    }
    player.color = "#eeea1e";

    //dash
    if (space)
    {
        if (d)
        {
            player.vx += 2;
        }
        if (a)
        {
            player.vx += -2;
        }
    }    

    if (shift)
    {
        gravity = 2;
        player.destroy--;
        player.color = "#ff0000";
        if (player.collisionCheck(platform0))
        {
            platform0.x = 10000;
        }
        if (player.collisionCheck(platform1))
        {
            platform1.x = 10000;
        }
        if (player.collisionCheck(platform2))
        {
            platform2.x = 10000;
        }
    }
    else
    {
        player.destroy = 30
    }

    if (npc1.active && shift && player.collisionCheck(npc1))
    {
        npc1.active = false;
        score++;
    }
    else if (npc1.active && player.collisionCheck(npc1))
    {
        clearInterval(timer);
        context.clearRect(0,0,canvas.width,canvas.height);

        context.font = "50px Arial";
        context.fillStyle = "red";
        context.fillText("GAME OVER", 250, 250);
    }

    if (player.destroy <= 0)
    {
        clearInterval(timer);
        context.clearRect(0,0,canvas.width,canvas.height);

        context.font = "50px Arial";
        context.fillStyle = "red";
        context.fillText("GAME OVER", 250, 250);

    }

   if (!npc1.active)
    {
        npc1.destroy--;

        if (npc1.destroy <= 0)
        {
            npc1.active = true;

            npc1.x = player.x + (Math.random() * 800 - 400);
            npc1.y = player.y + (Math.random() * 800 + 800);
            if (Math.random() > 0.5)
            {
                npc1.x = player.x + 400;
            }
            else
            {
                npc1.x = player.x - 400;
            }

            if (Math.random() > 0.5)
            {
                npc1.y = player.y + 400;
            }
            else
            {
                npc1.y = player.y - 400;
            }

            npc1.destroy = 30;
        }
    }


    /* if(d)
    {
        player.x += 4;
    }
    if(a)
    {
        player.x -= 4;
    } */

    doHandleAcceleration();
    doHandleFriction();
    doHandleGravity();
    doUpdatePosition();
    doCheckBottomBounds();
    doCheckTopBounds();
    doCheckLeftBounds();
    doCheckRightBounds();

    while(platform0.hitTestPoint(player.bottom()) && player.vy >= 0)
    {
        player.y--;
        player.vy = 0;
        player.canJump = true;
        jumpcount = 0;
    }

    while(platform0.hitTestPoint(npc1.bottom()) && npc1.vy >= 0)
    {
        npc1.y--;
        npc1.vy = 0;
    }

    while(platform1.hitTestPoint(player.bottom()) && player.vy >= 0)
    {
        player.y--;
        player.vy = 0;
        player.canJump = true;
        jumpcount = 0;
    }

    while(platform1.hitTestPoint(npc1.bottom()) && npc1.vy >= 0)
    {
        npc1.y--;
        npc1.vy = 0;
    }

    while(platform2.hitTestPoint(player.bottom()) && player.vy >= 0)
    {
        player.y--;
        player.vy = 0;
        player.canJump = true;
        jumpcount = 0;
    }

    while(platform2.hitTestPoint(npc1.bottom()) && npc1.vy >= 0)
    {
        npc1.y--;
        npc1.vy = 0;
    }

    // while(platform0.hitTestPoint(player.top()))
    // {
    //     player.y++;
    //     player.vy = 0;
    // }

    player.move();
    npc1.move();


    player.jumpSpeed = -20

    //npc1 collision stuff

    /*
    //npc2 collision stuff
    if (npc2.collisionCheck(player))
    {
        context.strokeRect(npc2.x-npc2.width/2, npc2.y-npc2.height/2, npc2.width, npc2.height);
    }

    if (npc3.collisionCheck(player))
    {
        player.x = player.prevX;
    }
    else
    {
        player.prevX = player.x;
    } */

    player.drawCircle();
    player.drawDebug();
    platform0.drawRect();
    platform1.drawRect();
    platform2.drawRect();
    if (npc1.active == true)
    {
        npc1.drawCircle();
    }
    /*
    npc2.drawCircle();
    npc3.drawRect(); */
}

function doHandleAcceleration()
{
    if (d)
    {
        player.vx += player.ax * player.force;
    }
    if (a)
    {
        player.vx += player.ax * -player.force;
    }
}

function doHandleFriction()
{
    player.vx *= frictionX;
}

function doHandleGravity()
{
    player.vy += gravity;
    npc1.vy += gravity;
}

function doUpdatePosition()
{
    player.x += player.vx;
    player.y += player.vy;

    npc1.x += npc1.vx;
    npc1.y += npc1.vy;
}

function doCheckBottomBounds()
{
    if (player.y > canvas.height - player.height/2)
    {
        player.y = canvas.height - player.height/2;
        player.vy = 0;
        player.canJump = true;
        jumpcount = 0;
        //doJump();
    }

    if (npc1.y > canvas.height - npc1.height/2)
    {
        npc1.y = canvas.height - npc1.height/2;
        npc1.vy = 0;
    }
}

function doCheckTopBounds()
{
    if (player.y < 0 + player.height/2)
    {
        player.y = 0 + player.height/2;
        player.vy = 0;
    }
    if (npc1.y < 0 + npc1.height/2)
    {
        npc1.y = 0 + npc1.height/2;
        npc1.vy = 0;
    }
}

function doCheckLeftBounds()
{
    if (player.x < 0 + player.width/2)
    {
        player.x = 0 + player.width/2;
        player.vx = 0;
    }
    if (npc1.x < 0 + npc1.width/2)
    {
        npc1.x = 0 + npc1.width/2;
        npc1.vx = 2;
    }
}

function doCheckRightBounds()
{
    if (player.x > canvas.width - player.width/2)
    {
        player.x = canvas.width - player.width/2;
        player.vx = 0;
    }
    if (npc1.x > canvas.width - npc1.width/2)
    {
        npc1.x = canvas.width - npc1.width/2;
        npc1.vx = -2;
    }
}


function doJump()
{
    if (w)
    {
        player.vy = player.jumpSpeed;
        
    }
}