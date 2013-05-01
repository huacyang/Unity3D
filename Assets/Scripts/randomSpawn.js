#pragma strict

var moveSpeed = 50;
// variable space for the spawning game objects
var object1 : GameObject;
var object2 : GameObject;
var object3 : GameObject;
var object4 : GameObject;
var object5 : GameObject;

private var spawnRate : int = 1;
private var randomObj : int;
private var randomSP : int;
private var randomPattern : int;
private var nextSpawn : float;
private var spawnObjects : GameObject[];
private var spawnPoints : GameObject[];

// Initializes the objects to spawn, storing it in an array
function initObj() {
	spawnObjects = new GameObject[5];
	spawnObjects[0] = object1;
	spawnObjects[1] = object2;
	spawnObjects[2] = object3;
	spawnObjects[3] = object4;
	spawnObjects[4] = object5;
}

// Initializes the spawn points, storing it in an array
function initSP() {
	spawnPoints = new GameObject[24];
	spawnPoints[0] = GameObject.FindGameObjectWithTag("sp01");
	spawnPoints[1] = GameObject.FindGameObjectWithTag("sp02");
	spawnPoints[2] = GameObject.FindGameObjectWithTag("sp03");
	spawnPoints[3] = GameObject.FindGameObjectWithTag("sp04");
	spawnPoints[4] = GameObject.FindGameObjectWithTag("sp05");
	spawnPoints[5] = GameObject.FindGameObjectWithTag("sp06");
	spawnPoints[6] = GameObject.FindGameObjectWithTag("sp07");
	spawnPoints[7] = GameObject.FindGameObjectWithTag("sp08");
	spawnPoints[8] = GameObject.FindGameObjectWithTag("sp09");
	spawnPoints[9] = GameObject.FindGameObjectWithTag("sp10");
	spawnPoints[10] = GameObject.FindGameObjectWithTag("sp11");
	spawnPoints[11] = GameObject.FindGameObjectWithTag("sp12");
	spawnPoints[12] = GameObject.FindGameObjectWithTag("sp13");
	spawnPoints[13] = GameObject.FindGameObjectWithTag("sp14");
	spawnPoints[14] = GameObject.FindGameObjectWithTag("sp15");
	spawnPoints[15] = GameObject.FindGameObjectWithTag("sp16");
	spawnPoints[16] = GameObject.FindGameObjectWithTag("sp17");
	spawnPoints[17] = GameObject.FindGameObjectWithTag("sp18");
	spawnPoints[18] = GameObject.FindGameObjectWithTag("sp19");
	spawnPoints[19] = GameObject.FindGameObjectWithTag("sp20");
	spawnPoints[20] = GameObject.FindGameObjectWithTag("sp21");
	spawnPoints[21] = GameObject.FindGameObjectWithTag("sp22");
	spawnPoints[22] = GameObject.FindGameObjectWithTag("sp23");
	spawnPoints[23] = GameObject.FindGameObjectWithTag("sp24");
}

/*
 * Helper method for pattern funtions,
 *  given the game object to spawn and the game object to spawn at,
 *  instantiate the game object at the spawn point
 */
function spawn(obj : GameObject, sp : GameObject) {
	var clone : GameObject = Instantiate (obj, sp.transform.position, sp.transform.rotation);
	clone.rigidbody.AddRelativeForce(Vector3.forward * moveSpeed);
}

// Spawn the game objects in a vertical line format
function patternLine() {
	var n = 0;
	var spawnTotal = randomSP + 5;
	
	for (var i = randomSP; i < spawnTotal; i++) {
		n = i;
		if (n > 23) { n -= 23; }
		spawn(spawnObjects[randomObj], spawnPoints[n]);
		yield WaitForSeconds(0.5);
	}
}

// Spawn the game objects in a box format
function patternSquare() {
	var botLeft : int;
	var botRight : int;
	var topLeft : int;
	var topRight : int;
	
	if (randomSP <= 5) {
		botLeft = 0;
		botRight = 5;
		topLeft = 13;
		topRight = 16;
	} else if (randomSP <= 11) {
		botLeft = 6;
		botRight = 11;
		topLeft = 19;
		topRight = 22;
	} else if (randomSP <= 17) {
		botLeft = 12;
		botRight = 17;
		topLeft = 1;
		topRight = 4;
	} else {
		botLeft = 18;
		botRight = 23;
		topLeft = 7;
		topRight = 10;
	}
	
	spawn(spawnObjects[randomObj], spawnPoints[botLeft]);
	spawn(spawnObjects[randomObj], spawnPoints[botRight]);
	spawn(spawnObjects[randomObj], spawnPoints[topLeft]);
	spawn(spawnObjects[randomObj], spawnPoints[topRight]);
}

// Spawn the game objects in a v shape format
function patternV() {
	var t = 1;
	var n = randomSP;
	var spawnTotal = 2;
	spawn(spawnObjects[randomObj], spawnPoints[randomSP]);
	yield WaitForSeconds(0.5);
	
	for (var i = 0; i < spawnTotal; i++) {
		var left = n - t;
		var right = n + t;
		if (left < 0) { left += 23; }
		if (right > 23) { right -= 23; }
		spawn(spawnObjects[randomObj], spawnPoints[left]);
		spawn(spawnObjects[randomObj], spawnPoints[right]);
		yield WaitForSeconds(0.5);
		t++;
	}
}

// Call the two methods to initialize the array of objects and array of spawn points
function Start() {
	initObj();
	initSP();
}

/* 
 * Main method for spawning the objects,
 *  randomizes 3 numbers(1 for the object to spawn, 1 for the initial spawn point, and 1 for the spawn format),
 *  sets the global variables randomObj and randomSP to two of the randomized numbers,
 *  calls the respective pattern function depending on the last randomized number
 */
function Update() {
	if (Time.time > nextSpawn) {
		randomObj = Mathf.Floor(Random.Range(0, 5));
		randomSP = Mathf.Floor(Random.Range(0, 24));
		randomPattern = Mathf.Floor(Random.Range(1, 4));
		nextSpawn = Time.time + spawnRate;
		
		switch(randomPattern) {
			case 1:
				patternLine();
				break;
			case 2:
				patternSquare();
				break;
			case 3:
				patternV();
				break;
			default:
				break;
		}
	}
}
