var HexGrid = require('../assets/hex-grid');

var invalidPos = ['0.0', '1.0.5', '2.0', '4.0', '5.0.5', '6.0', '7.0.5', '8.0', '0.1', '1.1.5', '8.1', '0.2', '8.2', '8.3', '0.5', '0.6', '7.6.5', '8.6', '0.7', '1.7.5', '3.7.5', '7.7.5', '8.7']

var pieces = [
    {
        name : 'BLEU',
        id: 1,
		src: './img/blue.png',
		nb: 7
    },
    {
        name : 'JAUNE',
        id: 2,
        src: './img/yellow.png',
        nb: 7
    },
    {
        name : 'ROUGE',
        id: 3,
        src:'./img/red.png',
        nb: 7
	},
	{
        name : 'VERT',
        id: 4,
        src: './img/green.png',
        nb: 7
	},
	{
		name : 'VIOLET',
		id: 5,
		src: './img/purple.png',
		nb: 7
	},
	{
        name : 'ORANGE',
		id: 6,
		src: './img/orange.png',
		nb: 7
	},
	{
        name : 'BLANC',
		id: 7,
		src: './img/white.png',
		nb: 7
	}
];

var empty = {
    name : 'EMPTY',
    id: 0,
    src: './img/empty.png',
    nb: 0
};

var pion = {
	name : 'PION',
	src: './img/pion.png'
};

var colours = [];

var initColors = function () {
	pieces.forEach(function (piece) {
		for (var i = 0; i< 7; i++){
            colours.push(piece);
		}
	});

    var j, x, i;
    for (i = colours.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = colours[i];
        colours[i] = colours[j];
        colours[j] = x;
    }
};

var TileFactory = function () {
	var _id = 0;
	return {
		newTile: function () {
			var tile = {
				id: _id.toString()
			};

			_id += 1;
			return tile;
		},
	};
};

/**
 * Draws tiles by creating DOM elements.
 * @param array options
 * @param object options.parent Parent DOM element.
 */
function DomTileDrawer(options) {
	if (typeof options === 'undefined') {
		throw new Error('must provide an options object');
	}

	if (typeof options.parent !== 'object' ||
		options.parent.hasOwnProperty('childNodes' === false)
	) {
		throw new Error('options.container must be an HTML element');
	}

	if (typeof options.tileSize !== 'number') {
		throw new Error('options.tileSize must be a number');
	}


	this.tileSize = options.tileSize;
	this.parent = options.parent;
}

DomTileDrawer.prototype.createDomTile = function(xPos, yPos) {
	var hexWidth = this.tileSize * 2;
	// 0.866 = (Math.sqrt(3) / 2);
	// 0.7510 = 362 / 482
	var tileHeight = hexWidth * 0.7510;

	var tileDiv = document.createElement('div');
	tileDiv.style.position = 'absolute';
	tileDiv.style.width = hexWidth + 'px';
	tileDiv.style.height = tileHeight + 'px';

	tileDiv.style.left = (xPos * hexWidth * 0.75) + 'px';
	tileDiv.style.top = (yPos * tileHeight) + 'px';

	var tileImg = document.createElement('img');
	tileImg.style.backgroundSize = hexWidth + 'px ' + tileHeight  + 'px';
	tileImg.style.width = '100%';
	tileImg.style.height = '100%';
	this.parent.appendChild(tileDiv);
	tileDiv.appendChild(tileImg)

	return tileImg;
};

DomTileDrawer.prototype.setTileImage = function(element, imgFilename) {
	if (typeof element !== 'object') {
		throw new Error('element is not an object');
	}

	element.src = imgFilename;
	element.style.backgroundImage = 'url(' + imgFilename + ')';
};

var tileFactory = new TileFactory();

/**
 * @param array options
 * @param object options.container DOM element for the grid.
 * @param object options.tileSize Tile height/width in pixels.
 * @param object options.width Grid width in tiles.
 * @param object options.height Grid height in tiles.
 * @param object options.onAnimationComplete Callback for when animation
 *        completes.
 */
function App(options) {
	if (typeof options === 'undefined') {
		throw new Error('must provide an options object');
	}

	if (typeof options.container !== 'object') {
		throw new Error('options.container must be an HTML element');
	}

	this.container = options.container;

	if (typeof options.tileSize !== 'number') {
		throw new Error('options.tileSize must be a number');
	}

	if (typeof options.width !== 'number') {
		throw new Error('options.width must be a number');
	}

	if (typeof options.height !== 'number') {
		throw new Error('options.height must be a number');
	}

	this.width = options.width;
	this.height = options.height;
	this.tileSize = options.tileSize;
	this.onAnimationComplete = options.onAnimationComplete;

	this.hexGrid = new HexGrid({
		width: options.width,
		height: options.height,
		orientation: 'flat-topped',
		layout: 'odd-q',
		tileFactory: tileFactory
	});

	this.dtd = new DomTileDrawer({
		parent: options.container,
		tileSize: this.tileSize
	});



	initColors();

	var iter = this.hexGrid.getTileIterator();
	var tile = iter.next();
	var tilePos, pos, i = 0;
	while (tile !== null) {
		tilePos = this.hexGrid.getPositionById(tile.id);
		pos = tilePos.x + '.' + tilePos.y;
		if (!invalidPos.includes(pos)){
			tile.element = this.dtd.createDomTile(tilePos.x, tilePos.y);
            tile.color = colours[i];
			this.dtd.setTileImage(
				tile.element,
				tile.color.src
			);
			i++;
		}
		tile = iter.next();
	}

	var Engine = require('../src/Engine')
    this.engine = new Engine();
	this.engine.init("Théo","Grishka");

	this.attachMouseEvents();
}

App.prototype.getTileColorByPos = function(x, y) {
	// Results in a dark border.
	console.log(x);
	console.log(y);
    return this.hexGrid.getTileByCoords(x,y).color;
};


App.prototype.attachMouseEvents = function() {
	var iter = this.hexGrid.getTileIterator();
	var tile = iter.next();
	while (tile !== null) {
		tilePos = this.hexGrid.getPositionById(tile.id);
		pos = tilePos.x + '.' + tilePos.y;
		if (!invalidPos.includes(pos)) {
			tile.element.addEventListener("click", onTileClick, false);
			tile.element.myParam1 = tile;
			tile.element.myParam1.posX = tilePos.x;
			tile.element.myParam1.posY = tilePos.y;
			tile.element.myEngine = this.engine;
			tile.element.myApp = this;
		}
		tile = iter.next();
	}
	var buttonEndTurn = document.getElementById("button-end");
	buttonEndTurn.Engine = this.engine;
	buttonEndTurn.addEventListener("click", onButtonEndClick);
}; 

var onButtonEndClick = function(evt) {
	var engine = evt.target.offsetParent.Engine;
	engine.changePlayer();	
}

var onTileClick = function(evt) {
	var x = evt.target.myParam1.posX
	var y = evt.target.myParam1.posY
	var myEngine = evt.target.myEngine
	var myApp = evt.target.myApp

	console.log(myApp.hexGrid.getTileByCoords(x,y));

	var nbturn = myEngine.getNbTurn();
	var pionX = myEngine.getPionX();
	var pionY = myEngine.getPionY();

    if (myEngine.move(x,y,myApp.getTileColorByPos(x,y))){
    	console.log("tour");
        myApp.dtd.setTileImage(myApp.hexGrid.getTileByCoords(x,y).element, pion.src );
		
        if (nbturn > 0){
            myApp.dtd.setTileImage(myApp.hexGrid.getTileByCoords(pionX,pionY).element, empty.src );
		}
	}
};

App.prototype.animateLeftToRight = function() {
	var iter = this.hexGrid.getTileIterator();
	var tile = iter.next();
	var animationInterval;

	tilePos = this.hexGrid.getPositionById(tile.id);
	pos = tilePos.x + '.' + tilePos.y;

	var animate = function() {
		if (tile === null || !invalidPos.includes(pos)) {
			window.clearInterval(animationInterval);
			this.animationComplete();
			return;
		}

		//this.dtd.setTileImage(tile.element, './img/dark-circle.png');
		tile = iter.next();
	}.bind(this);

	animationInterval = window.setInterval(animate, 50);
};

App.prototype.animationComplete = function() {
	if (typeof this.onAnimationComplete === 'function') {
		this.onAnimationComplete.call(null, this);
	}
};

module.exports = App;