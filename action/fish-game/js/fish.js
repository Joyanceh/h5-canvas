//鱼对象
function fishObj(){
	this.x=canWidth*.5;
	this.y=canHeight*.5;
	this.i=0;
	this.j=0;
	this.width=0;
	this.height=0;
	this.fishPicl=[];
	this.fishPicr=[];
	this.dir='l';
	this.hide=false;
};
//向左向右数组
fishObj.prototype.init=function(){
	for(var i=0;i<6;i++){
		//向左
		this.fishPicl[i]=new Image();
		this.fishPicl[i].src='./img/fish-l'+i+'.png';
		//向右
		this.fishPicr[i]=new Image();
		this.fishPicr[i].src='./img/fish-r'+i+'.png'
	}		
	
};
//
fishObj.prototype.draw=function(){
	this.width=this.fishPicl[0].width;
	this.height=this.fishPicl[0].height;
	ctx2.save();
	// ctx2.clearRect(0,0,canWidth,canHeight);
	//无限接近，缓冲过程
	this.x=infiniteNear(mx,this.x,0.93);
	this.y=infiniteNear(my,this.y,0.93);
	ctx2.translate(this.x-this.width*.25,this.y-this.height*.25)
	this.i++;
	this.i%=20;
	if(this.i==0){
		this.j++;
		this.j%=6;
	}
	if(this.dir=='l'){
		var pic=this.fishPicl;
	}else{
		var pic=this.fishPicr;
	}
	ctx2.drawImage(pic[this.j],0,0,this.width*.5,this.height*.5);
	ctx2.restore();
};