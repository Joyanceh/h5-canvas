function dustObj(){
	this.dustPic=[];
}
//尘埃数量
dustObj.prototype.num=15;
//尘埃初试化
dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		var no=Math.floor(Math.random()*7);
		this.dustPic[i]=new Image();
		var dust=this.dustPic[i];
		dust.src='./img/dust'+no+'.png';
		dust.x1=Math.random()*canWidth;
		dust.y1=Math.random()*canWidth;
		dust.ang=0;
		dust.glo=Math.random();
		dust.amp=10+Math.random()*15;
	};
}
//尘埃描绘
dustObj.prototype.draw=function(){
	ctx2.clearRect(0,0,canWidth,canHeight);
	for(var i=0;i<this.dustPic.length;i++){
		var dust=this.dustPic[i];
		dust.ang+=0.02;
		dust.glo+=0.01;
		var amp=dust.amp*Math.sin(dust.ang);
		ctx2.save();
		ctx2.globalAlpha=Math.abs(Math.sin(dust.glo));
		ctx2.drawImage(dust,dust.x1+amp,dust.y1);
		ctx2.restore();
	}
}