var ctx,ctx1,ctx2,bgPic,lasttime,deltatime,canWidth,canHight,ane,fish,mx,my,bubble,dust;
document.body.onload=game
function game(){
	progress()
};

//进度初始化
function progress(){
	$('#fish').html('<canvas id="canvas" width="'+($('#fish').width())+'" height="'+($('#fish').height())+'"></canvas><canvas id="canvas1" width="'+($('#fish').width())+'" height="'+($('#fish').height())+'"></canvas>');
	ctx=$('#canvas')[0].getContext('2d');
	ctx1=$('#canvas1')[0].getContext('2d');
	fishCanvas(200);	
}
//进度条鱼
function fishCanvas(width){
		bgPic=new Image()
		var fish=new Image();
		bgPic.src='./img/background.jpg';
		fish.src='./img/fish-l1.png'; 
		canWidth=$('#canvas1')[0].width;
		canHeight=$('#canvas1')[0].height;
		var obj={};
		fish.onload=function(){
			bg();
			obj.ratio=fish.width/fish.height;
			obj.width=width;
			obj.height=width/obj.ratio;
			obj.x=($('#canvas').width())/2-width/2;
			obj.y=($('#canvas').height())/2-obj.height/2;
			ctx.drawImage(fish,obj.x,obj.y,width,obj.height);	
			//参与总数
			obj.total=6;
			//参与人数
			obj.participation=6;
			obj.rate=obj.participation/obj.total;
			obj.x1=obj.x;
			obj.fontSize=obj.width/664*100;
			timer=setInterval(function(){
				obj.x1+=1;
				// 进度条X坐标是否大于已参加的坐标
				if(obj.x1<=(obj.x+obj.width*obj.rate)){
					obj.percent=Math.round((obj.x1-obj.x)/obj.width*100);
					ctx.clearRect(obj.x,obj.y-1,obj.width,obj.height+2);
					ctx.drawImage(fish,obj.x,obj.y,width,obj.height);
					ctx.fillStyle='rgba(255,255,255,.6)';
					ctx.fillRect(obj.x1,obj.y,obj.width-obj.x1+obj.x,obj.height);
					ctx.textAlign="center";    
					ctx.font=obj.fontSize+"px Arial";
					ctx.fillStyle='black';
					// /ctx.fillText(''+obj.percent+'%',(obj.x1+obj.width+obj.x)/2,obj.y+obj.height/2+obj.fontSize/2);		
					ctx.fillText(''+obj.percent+'%',(2*obj.x+obj.width)/2,obj.y+obj.height/2+obj.fontSize/2);
					
				}else{
				//移除进度条	
					clearInterval(timer);
					if(obj.rate==1){
						ctx.clearRect(obj.x,obj.y-1,obj.width,obj.height+2);
						ctx.fillStyle='white';
						ctx.fillText('Loading',(2*obj.x+obj.width)/2,obj.y+obj.height/2+obj.fontSize/2);
						setTimeout(function(){
							$('#canvas').remove();
							//初试化动画
							createCanvas();
							init();
							//鱼交互开始
							gameLoop();
						},2000);
					}
				}
			},10)
		}
}	
function createCanvas(){
	$('#fish').append('<canvas id="canvas2" width="'+($('#fish').width())+'" height="'+($('#fish').height())+'"></canvas>');
};
function init(){	
	ctx2=$('#canvas2')[0].getContext('2d');
	lasttime=Date.now();
	mx=canWidth*.5;
	my=canHeight*.5;
	ane=new aneObj();
	ane.born();
	bubble=new bubbleObj();
	bubble.init();
	dust=new dustObj();
	dust.init();
	fish=new fishObj();
	fish.init();
	$('#canvas2')[0].addEventListener('touchmove',move,false);
};
//canvas画布刷新
function gameLoop(){
	var now=Date.now();
	deltatime=now-lasttime;
	lasttime=now;
	//
	bg();
	ane.draw();
	bubbleMonitor();
	bubble.draw();
	dust.draw();
	changeDir();
	fish.draw();
	requestAnimFrame(gameLoop);
};
//鱼根据手指坐标移动
function move(e){
	e.preventDefault();
	// console.log(e.touches[0].clientX);
	if(!fish.hide){
			var x=e.touches[0].clientX;
			var y=e.touches[0].clientY;
			mx=x;
			my=y;			
			(y>canHeight)&&(my=canHeight-fish.height*.25);
			(y<0)&&(my=0+fish.height*.25);

	}

};
//鱼碰到两边边界的方向转变
function changeDir(){
			//向左并且鱼方向向左
			if(mx<=0&&fish.dir=='l'){
				fish.hide=true;
				mx--;	
				if(mx<-(fish.width+10)){
					fish.dir='r';
				}
			};
			//往右回来且鱼方向向右
			if(mx<(0+fish.width*.25)&&fish.dir=='r'){
				mx+=2;				
			}else if(mx>=(0+fish.width*.25)&&fish.dir=='r'){
				fish.hide=false;
			};
			//往右并且鱼方向向右
			if(mx>(canWidth)&&fish.dir=='r'){
				fish.hide=true;
				mx++;
				if(mx>(canWidth+fish.width+10)){
					fish.dir='l';
				}
			};
			//往右左并且方向向左
			if(mx>(canWidth-fish.width*.25)&&fish.dir=='l'){
				mx-=2;
			}else if(mx>=(0+fish.width*.25)&&fish.dir=='l'){
				fish.hide=false;
			};

}
//监视和增加气泡数目
function bubbleMonitor(){
	if(Math.random()<.005){
		for(var i=0;i<bubble.num;i++){
			if(!bubble.bubArr[i].alive){
				bubble.born(i);
				return;
			}
		}
	}
}
