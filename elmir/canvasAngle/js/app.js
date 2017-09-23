// Closuers

window.onload = function() {
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d'),
	    fps = 100;

    ball = {
        x: 50,
        y: 30,
        w: 60,
        h: 100,
        v: 0, // pixel per millisecond
        a:80, // angle
        ac: 20, // acceleration
        c: '#ccc'
    };

    plate = {
    	x:10,
    	y:canvas.height-30,
    	w:300,
    	h:15,
    	c: '#ccc'
    }




    var moveBall = setInterval(moveBallFunc, 1);

    function moveBallFunc(e) {
    	ball.x = ball.x + ( ball.v * Math.cos((ball.a * Math.PI)/180))
    	ball.y = ball.y + ( ball.v * Math.sin((ball.a * Math.PI)/180))

    	// console.log(' poss : ', ball.v );

    	ball.v = ball.v + ball.ac*0.001;


    	if ( (ball.y + ball.h).toFixed() > plate.y && ball.x > plate.x && ball.x < plate.x + plate.w || (ball.y + ball.h).toFixed() > plate.y && ball.x+ball.w > plate.x && ball.x+ball.w < plate.x + plate.w ) {
    		// clearInterval(moveBall);
    		// ball.a = Math.abs(ball.a);

    		ball.a = ball.a * (-1);
    		ball.ac = Math.abs(ball.ac) * (-1);
    		// ball.v = ball.v-1

    		var dist = ball.x - plate.x,
    			rate = dist/(plate.w/2);

    		if (dist<0) {

    			var mA = 90+(90 * rate);
    		ball.a = -1*Math.abs(mA);


    		}else if (dist>0) {

    			var mA = 90 * rate;
    		ball.a = -1*Math.abs(mA);


    		}
    		
    		
    	}

    	if (ball.x+ball.w > canvas.width) {
    		ball.a = ball.a+90;
    	}
    	if (ball.x < 0) {
    		ball.a = ball.a+90;
    	}
    	if (ball.y < 0) {
    		ball.a = ball.a+90;
    	}

    	if (ball.v < 0.001 && ball.ac<0) {
    		console.log(' speed : ', ball.v );

    		ball.a = ball.a * (-1);
    		ball.ac = Math.abs(ball.ac);
    		// ball.v = 0;

    	}
    	
    }

    function movePlate(e) {
		plate.x = e.offsetX-plate.w/2;
		console.log(' plll : ', plate.x );
    }

    canvas.addEventListener('mousemove',function(e){
    	movePlate(e)
    })


    var renderAll = setInterval(renderFunc, 1000 / fps);

    function renderFunc(e) {

    	ctx.clearRect( 0, 0, canvas.width, canvas.height)

        ctx.fillStyle = ball.c;
        ctx.fillRect(ball.x, ball.y, ball.w, ball.h);

        ctx.fillStyle = plate.c;
        ctx.fillRect(plate.x, plate.y, plate.w, plate.h);


    }
    console.log(' www : ',  canvas.width, canvas.height);



}