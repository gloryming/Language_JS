var TestLayer = cc.Layer.extend({
	N_Loop:null,
	N_Call:null,
	N_MAT4:null,
	c:null,

	ctor:function(){
		this._super();
		cc.associateWithNative( this, cc.Layer );
	},

	init:function(){
		this._super();
		
		this.N_Loop = 1000;
		this.N_Call = 1000000;
		this.N_MAT4 = 100000;
		this.c = new Array(16);

		var size = cc.Director.getInstance().getWinSize();

		var loop = cc.LabelTTF.create("Loop Test", "Arial", 30);
		var call = cc.LabelTTF.create("CallFunc Test", "Arial", 30);
		var mat4 = cc.LabelTTF.create("MAT4 Test", "Arial", 30);

		var loopItem = cc.MenuItemLabel.create(loop, this.loopCallback, this);
		var callItem = cc.MenuItemLabel.create(call, this.callFuncCallback, this);
		var mat4Item = cc.MenuItemLabel.create(mat4, this.mat4Callback, this);

		loopItem.setPosition(cc.p(size.width / 2, size.height / 3 * 2));
        callItem.setPosition(cc.p(size.width / 2, size.height / 2));
        mat4Item.setPosition(cc.p(size.width / 2, size.height / 3));

        var menu = cc.Menu.create(loopItem, callItem, mat4Item);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);

	},
	loopCallback:function(sender){
		cc.log("loopCallback entered!");
		var i = 0;
    
    	var start = this.getCurrentTime();
    
    	while (i < this.N_Loop) {
        	i++;
        	cc.log("Count: " + i);
    	}
    
    	var end = this.getCurrentTime();
    	var duration = end - start;
    
		cc.log("CallFunc:start = " + start + " end = " + end + " duration = " + duration);
	},
	callFuncCallback:function(sender){
		var sum = 0, i = 0;
    
        var start = this.getCurrentTime();
    
        while (i < this.N_Call) {
            sum += this.addFunc(i, 1);
            i++;
        }
    
        var end = this.getCurrentTime();
        var duration = end - start;
    
        cc.log("CallFunc:start = " + start + " end = " + end + " duration = " + duration);
	},
	mat4Callback:function(sender){
		var a = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7]];
		var b = [[5, 6, 7, 8], [6, 7, 8, 9], [7, 8, 9, 10], [8, 9, 10, 11]];
		var i = 0;

		var start = this.getCurrentTime();
		
		while(i < this.N_MAT4){
			this.multiplayMatrix(a, b, this.c);
			i++;
		}

		var end = this.getCurrentTime();
        var duration = end - start;
        
        cc.log("CallFunc:start = " + start + " end = " + end + " duration = " + duration);
        
//		for (var i = 0; i < 4; ++i) {
//        	for (var j = 0; j < 4; ++j) {
//            	cc.log("c[" + i + "][" + j + "] = " + this.c[i * 4 + j]);
//        	}
//    	}
	},
	getCurrentTime:function(){
		var time = new Date();
		return time.getMinutes() * 60 * 1000 + time.getSeconds() * 1000 + time.getMilliseconds();
	},
	addFunc:function(a, b){
		return a + b;
	},
	multiplayMatrix:function(a, b, c){
		var sum = 0;
    	var n = 0;
    
    	for (var i = 0; i < 4; ++i) {
        	while (n < 4) {
            	for (var j = 0; j < 4; ++j) {
                	sum += a[i][j] * b[j][n];
            	}
            	c[i * 4 + n] = sum;
            	++n;
            	sum = 0;
        	}
        	n = 0;
    	}
	}
});

var TestScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		cc.associateWithNative( this, cc.Scene );
	},

	onEnter:function(){
		this._super();
		var layer = new TestLayer();
		this.addChild(layer);
		layer.init();
	}
});