//海葵对象
function aneObj(){
	//X坐标
	this.x=[];
	//海葵长度
	this.len=[];
	//海葵宽度
	this.width=[];
  	//正弦值弧度
	this.ang=0;
	// this.amp=10+Math.random()*15;
}
//海葵数量
aneObj.prototype.num=15;
//随机画出海葵
aneObj.prototype.born=function(){
	var x=0;
	for(var i=0;i<this.num;i++){
		this.x[i]=x;
		this.len[i]=80+Math.random()*70;
		this.width[i]=10+Math.random()*11;
		x+=(20+Math.random()*12)
	}
}
//画海葵
aneObj.prototype.draw=function(){
	//保存画笔样式
	ctx1.save();
	ctx1.globalAlpha=.6;
	ctx1.strokeStyle="#3b154e";
	ctx1.lineCap="round";
	this.ang+=0.02;
	for(var i=0;i<this.num;i++){	
		// var l=this.amp*Math.sin(this.ang);
		var l=this.len[i]*.2*Math.sin(this.ang);
		ctx1.beginPath();	
		ctx1.lineWidth=this.width[i];
		ctx1.moveTo(this.x[i],canHeight);
		ctx1.quadraticCurveTo(this.x[i],canHeight-this.len[i]*3/5,this.x[i]+l,canHeight-this.len[i]);
		ctx1.stroke();
	}
	//恢复画笔样式
	ctx1.restore();
}