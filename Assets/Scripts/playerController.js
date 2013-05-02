#pragma strict

/* 
 * The speed of the keyboard controls. A higher value will
 * cause the object to move more rapidly.
 */
var moveSpeed = 10;
var spawnPoint : GameObject;
var mesh : GameObject;

private var invincible : boolean = false;
private var upAxis : Vector3;
private var mouseScreenPosition : Vector3;
private var mouseWorldSpace : Vector3;

function applyDMG() {
	gameObject.transform.position = spawnPoint.transform.position;
	gameObject.transform.rotation = spawnPoint.transform.rotation;
	gameObject.GetComponent(gui).health--;
	invincible = true;
	yield WaitForSeconds(5.0);
	invincible = false;
	mesh.renderer.enabled = true;
}

// FixedUpdate is a built-in unity function that is called every fixed framerate frame.
function FixedUpdate() {
	// This is where we move the object.

	// Get input from the keyboard, with automatic smoothing (GetAxis instead of GetAxisRaw).
	// We always want the movement to be framerate independent, so we multiply by Time.deltaTime.
	var keyboardX = Input.GetAxis("Horizontal") * moveSpeed * Time.deltaTime;
	var keyboardY = Input.GetAxis("Vertical") * moveSpeed * Time.deltaTime;

	// Calculate the new position based on the above input.
	// If you want to limit the movement, you can use Mathf.Clamp
	// to limit the allowed range of newPos.x or newPos.y.
	var newPos = rigidbody.position + Vector3(keyboardX, keyboardY, 0.0);

	// Move the object.
	rigidbody.MovePosition(newPos);
	rigidbody.freezeRotation = true;
}

function Update() {
	//Aim player at mouse
	//which direction is up
	upAxis = new Vector3(0,0,1);
	mouseScreenPosition = Input.mousePosition;
	//set mouses z to your targets
	mouseScreenPosition.z = transform.position.z;
	mouseWorldSpace = Camera.mainCamera.ScreenToWorldPoint(mouseScreenPosition);
	transform.LookAt(mouseWorldSpace, upAxis);
	//zero out all rotations except the axis I want
	transform.eulerAngles = new Vector3(0,0,transform.eulerAngles.z);
	
	if (invincible) {
		if (mesh.renderer.enabled)
			mesh.renderer.enabled = false;
		else
			mesh.renderer.enabled = true;
	}
	
}

function OnCollisionEnter(collision : Collision) {
	rigidbody.velocity = Vector3.zero;
	
	if (!invincible) {
		applyDMG();
	}
}

// Require a Rigidbody component to be attached to the same GameObject.
@script RequireComponent(Rigidbody)