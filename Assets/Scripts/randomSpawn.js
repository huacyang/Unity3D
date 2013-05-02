#pragma strict

var moveSpeed = 50;
// variable array space for spawning objects
var spawnObjects : GameObject[];
// variable array space for objects' spawning point
var spawnPoints : GameObject[];

private var spawnRate : int = 20;
private var randomObj : int;
private var randomSP : int;
private var randomPattern : int;
private var nextSpawn : float;

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

/* 
 * Main method for spawning the objects,
 *  randomizes 3 numbers(1 for the object to spawn, 1 for the initial spawn point, and 1 for the spawn format),
 *  sets the global variables randomObj and randomSP to two of the randomized numbers,
 *  calls the respective pattern function depending on the last randomized number
 */
function Update() {
	if (Time.time > nextSpawn) {
		randomObj = Mathf.Floor(Random.Range(0, spawnObjects.length));
		randomSP = Mathf.Floor(Random.Range(0, spawnPoints.length));
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
