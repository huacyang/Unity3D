#pragma strict

var explosion : GameObject; // drag your explosion prefab here
var explosionTime : int = 2;
private var score : int = 0;

function OnCollisionEnter(collision : Collision){

    var explosionClone = Instantiate(explosion, transform.position, Quaternion.identity);
    Destroy(gameObject);
    Destroy(explosionClone, explosionTime);
    
    if (collision.gameObject.tag == "Enemy") {
    	score = collision.gameObject.GetComponent(scoreValue).scoreValue;
    	GameObject.FindGameObjectWithTag("Player").GetComponent(gui).score += score;
    }
}